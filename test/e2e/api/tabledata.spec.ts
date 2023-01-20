import { map, omit, sortBy } from 'lodash';
import config from '../_common/config';
import commands from '../_common/commands';
import { generator as tableRowGenerator, schema } from './examples/schemas/tabledata';
import { expect } from 'chai';

const { DATASET_NAME, TABLE_NAME } = config;

const sortResultByFieldValues = data => sortBy(data, map(schema.fields, 'name'));

describe('TableData', function() {
  let realInsertResult;
  let fakeInsertResult;

  before(async function() {
    await commands.createDatasets(DATASET_NAME);
    await commands.createTables(DATASET_NAME, TABLE_NAME, schema);
    [realInsertResult, fakeInsertResult] =
      await commands.loadDataToTables(DATASET_NAME, TABLE_NAME, tableRowGenerator, 10);
  });

  after(async function() {
    await commands.cleanupDatasets(DATASET_NAME);
  });

  it('inserts rows to table', async function() {
    expect(omit(fakeInsertResult[0], 'generator'))
      .to.be.eql(omit(realInsertResult[0], 'generator'));
  });

  it('gets all data from table', async function() {
    const [realDataAll, fakeDataAll] =
      await commands.runEverywhere(conn => conn.dataset(DATASET_NAME).table(TABLE_NAME).getRows());

    expect(sortResultByFieldValues(fakeDataAll[0]))
      .to.be.eql(sortResultByFieldValues(realDataAll[0]));
  });

  it('gets all rows paged', async function() {
    const [realData, fakeData] = await commands.runEverywhere(async conn => {
      let dataPaged = [null, { maxResults: 2 }];
      let data = [];
      do {
        dataPaged = await conn.dataset(DATASET_NAME).table(TABLE_NAME).getRows(dataPaged[1]);
        if (dataPaged[0]) { data = data.concat(dataPaged[0]); }
      } while (dataPaged[1]);

      return data;
    });

    expect(sortResultByFieldValues(fakeData))
      .to.be.eql(sortResultByFieldValues(realData));
  });
});
