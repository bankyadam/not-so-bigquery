'use strict';

const { DATASET_NAME, TABLE_NAME } = require('../_common/config')();
const commands = require('../_common/commands');
const { schema, generator: tableRowGenerator } = require('./examples/schemas/query');

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
