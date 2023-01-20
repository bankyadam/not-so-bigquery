import config from '../_common/config';
import commands from '../_common/commands';
import { generator as tableRowGenerator, schema } from './examples/schemas/query';
import { expect } from 'chai';

const { DATASET_NAME, TABLE_NAME } = config;

const runQuery = function(query) {
  return commands.runEverywhere(conn => conn.query(query));
};

describe('Querying', function() {
  before(async function() {
    await commands.createDatasets(DATASET_NAME);
    await commands.createTables(DATASET_NAME, TABLE_NAME, schema);
    await commands.loadDataToTables(DATASET_NAME, TABLE_NAME, tableRowGenerator, 10);
  });

  after(async function() {
    await commands.cleanupDatasets(DATASET_NAME);
  });

  it('runs a query', async function() {
    const query = `SELECT * FROM ${DATASET_NAME}.${TABLE_NAME}`;
    const [realResult, fakeResult] = await runQuery(query);
    expect(fakeResult.length).to.be.eql(realResult.length);
  });
});
