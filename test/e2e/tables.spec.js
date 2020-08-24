'use strict';

const { pick } = require('lodash');

const { DATASET_NAME, TABLE_NAME } = require('./common/config')();
const bqReal = require('./common/connection-real');
const bqFake = require('./common/connection-fake');
const fields = require('./examples/fields');
const complexSchema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_STRING_WITHOUT_DESCRIPTION,
    fields.FIELD_SIMPLE_INTEGER,
    fields.FIELD_SIMPLE_INT64,
    fields.FIELD_SIMPLE_BOOLEAN,
    fields.FIELD_SIMPLE_BOOL,
    fields.FIELD_SIMPLE_FLOAT,
    fields.FIELD_SIMPLE_FLOAT64,
    fields.FIELD_SIMPLE_TIME,
    fields.FIELD_SIMPLE_DATE,
    fields.FIELD_SIMPLE_DATETIME
  ]
};

const cleanupDatasets = require('./common/cleanup-datasets');

describe('Tables', function() {
  let datasetReal;
  let datasetFake;

  before(async function() {
    await bqReal.dataset(DATASET_NAME).create();
    await bqFake.dataset(DATASET_NAME).create();

    [datasetReal] = (await bqReal.dataset(DATASET_NAME).get());
    [datasetFake] = (await bqFake.dataset(DATASET_NAME).get());
  });

  after(async function() {
    await cleanupDatasets(DATASET_NAME);
  });

  it('checks for a table does not exist', async function() {
    const realShouldNotExists = (await datasetReal.table(TABLE_NAME).exists())[0];
    const fakeShouldNotExists = (await datasetFake.table(TABLE_NAME).exists())[0];
    expect(realShouldNotExists).to.be.false;
    expect(fakeShouldNotExists).to.be.false;
  });

  it('gets empty table list', async function() {
    const realTablesEmpty = await datasetReal.getTables();
    const fakeTablesEmpty = await datasetFake.getTables();
    expect(fakeTablesEmpty).to.be.eql(realTablesEmpty);
  });

  it('creates table that does not exist', async function() {
    const realCreateTableResult = await datasetReal.createTable(TABLE_NAME, { schema: complexSchema });
    const fakeCreateTableResult = await datasetFake.createTable(TABLE_NAME, { schema: complexSchema });

    const createTableAttributes = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeCreateTableResult[0], createTableAttributes))
      .to.be.eql(pick(realCreateTableResult[0], createTableAttributes));
  });

  it('tries to recreate a table that already exist', async function() {
    let realTableCreateError;
    try {
      await datasetReal.createTable(TABLE_NAME, { schema: complexSchema });
    } catch (e) {
      realTableCreateError = {
        code: e.code,
        errors: e.errors
      };
    }

    let fakeTableCreateError;
    try {
      await datasetFake.createTable(TABLE_NAME, { schema: complexSchema });
    } catch (e) {
      fakeTableCreateError = {
        code: e.code,
        errors: e.errors
      };
    }

    expect(fakeTableCreateError).to.be.eql(realTableCreateError);
  });

  it('check get table entity', async function() {
    const realTableEntity = await datasetReal.table(TABLE_NAME).get();
    const fakeTableEntity = await datasetFake.table(TABLE_NAME).get();
    const tableAttributes0 = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeTableEntity[0], tableAttributes0))
      .to.be.eql(pick(realTableEntity[0], tableAttributes0));
  });

  it('get non-empty table list', async function() {
    const realTablesNotEmpty = await datasetReal.getTables();
    const fakeTablesNotEmpty = await datasetFake.getTables();

    const tableAttributes0 = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeTablesNotEmpty[0], tableAttributes0))
      .to.be.eql(pick(realTablesNotEmpty[0], tableAttributes0));
  });
});
