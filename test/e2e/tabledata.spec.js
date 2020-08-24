'use strict';

const { sortBy, omit } = require('lodash');

const { DATASET_NAME, TABLE_NAME } = require('./common/config')();
const bqReal = require('./common/connection-real');
const bqFake = require('./common/connection-fake');
const fields = require('./examples/fields');

const schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_INTEGER
  ]
};

const cleanupDatasets = require('./common/cleanup-datasets');

describe('TableData', function() {
  let realTable;
  let fakeTable;

  before(async function() {
    await bqReal.dataset(DATASET_NAME).create();
    await bqFake.dataset(DATASET_NAME).create();

    await bqReal.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema });
    await bqFake.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema });

    realTable = bqReal.dataset(DATASET_NAME).table(TABLE_NAME);
    fakeTable = bqFake.dataset(DATASET_NAME).table(TABLE_NAME);
  });

  after(async function() {
    await cleanupDatasets(DATASET_NAME);
  });

  it('inserts rows to table', async function() {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push({
        [fields.FIELD_SIMPLE_STRING.name]: `long test to check ${i}`,
        [fields.FIELD_SIMPLE_INTEGER.name]: Math.round(Math.random() * 900000000 + 100000000)
      });
    }
    const realInsertResult = await realTable.insert(rows);
    const fakeInsertResult = await fakeTable.insert(rows);
    expect(omit(fakeInsertResult[0], 'generator'))
      .to.be.eql(omit(realInsertResult[0], 'generator'));
  });

  it('gets all data from table', async function() {
    const realDataAll = await realTable.getRows();
    const fakeDataAll = await fakeTable.getRows();
    expect(sortBy(fakeDataAll[0], [fields.FIELD_SIMPLE_STRING.name, fields.FIELD_SIMPLE_INTEGER.name]))
      .to.be.eql(sortBy(realDataAll[0], [fields.FIELD_SIMPLE_STRING.name, fields.FIELD_SIMPLE_INTEGER.name]));
  });

  it('gets all rows paged', async function() {
    let realPagedOptions = { maxResults: 2 };
    let fakePagedOptions = { maxResults: 2 };
    let realDataPaged;
    let fakeDataPaged;
    let realData = [];
    let fakeData = [];
    do {
      realDataPaged = await realTable.getRows(realPagedOptions);
      fakeDataPaged = await fakeTable.getRows(fakePagedOptions);
      if (realDataPaged[0]) { realData = realData.concat(realDataPaged[0]); }
      if (fakeDataPaged[0]) { fakeData = fakeData.concat(fakeDataPaged[0]); }
      realPagedOptions = realDataPaged[1];
      fakePagedOptions = fakeDataPaged[1];
    } while (realPagedOptions && fakePagedOptions);

    expect(sortBy(fakeData, [fields.FIELD_SIMPLE_STRING.name, fields.FIELD_SIMPLE_INTEGER.name]))
      .to.be.eql(sortBy(realData, [fields.FIELD_SIMPLE_STRING.name, fields.FIELD_SIMPLE_INTEGER.name]));
  });
});
