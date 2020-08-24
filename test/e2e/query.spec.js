'use strict';

const { DATASET_NAME, TABLE_NAME } = require('./common/config')();
const bqReal = require('./common/connection-real');
const bqFake = require('./common/connection-fake');
const fields = require('./examples/fields');

const schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_INTEGER,
    fields.FIELD_SIMPLE_BOOLEAN
  ]
};

const cleanupDatasets = require('./common/cleanup-datasets');

describe('Querying', function() {
  before(async function() {
    await bqReal.dataset(DATASET_NAME).create();
    await bqFake.dataset(DATASET_NAME).create();

    await bqReal.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema });
    await bqFake.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema });

    const rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push({
        [fields.FIELD_SIMPLE_STRING.name]: `long test to check ${i}`,
        [fields.FIELD_SIMPLE_INTEGER.name]: Math.round(Math.random() * 900000000 + 100000000),
        [fields.FIELD_SIMPLE_BOOLEAN.name]: Math.random() > 0.5
      });
    }
    await bqReal.dataset(DATASET_NAME).table(TABLE_NAME).insert(rows);
    await bqFake.dataset(DATASET_NAME).table(TABLE_NAME).insert(rows);
  });

  after(async function() {
    await cleanupDatasets(DATASET_NAME);
  });

  it('runs a simple query', async function() {
    const query = `SELECT * FROM ${DATASET_NAME}.${TABLE_NAME}`;
    const [realResult] = await bqReal.query(query);
    const [fakeResult] = await bqFake.query(query);
    expect(fakeResult.length).to.be.eql(realResult.length);
  });

  it('runs a complex query', async function() {
    const query = `
      SELECT
            ${fields.FIELD_SIMPLE_STRING.name},
            ${fields.FIELD_SIMPLE_INTEGER.name}
      FROM
          ${DATASET_NAME}.${TABLE_NAME}
      ORDER BY
              ${fields.FIELD_SIMPLE_BOOLEAN.name} ASC,
              ${fields.FIELD_SIMPLE_INTEGER.name} DESC
    `;
    const [realResult] = await bqReal.query(query);
    const [fakeResult] = await bqFake.query(query);
    expect(fakeResult).to.be.eql(realResult);
  });
});
