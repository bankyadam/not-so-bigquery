'use strict';

const { sortBy, omit, map } = require('lodash');
const { DATASET_NAME, TABLE_NAME } = require('../support/config')();
const commands = require('../support/commands');
const { schema, generator: tableRowGenerator } = require('./examples/schemas/tabledata');

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
    expect(sortBy(fakeDataAll[0], map(schema.fields, 'name')))
      .to.be.eql(sortBy(realDataAll[0], map(schema.fields, 'name')));
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

    expect(sortBy(fakeData, map(schema.fields, 'name')))
      .to.be.eql(sortBy(realData, map(schema.fields, 'name')));
  });
});
