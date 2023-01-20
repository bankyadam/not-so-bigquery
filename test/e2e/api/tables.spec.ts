import { pick } from 'lodash';
import commands from '../_common/commands';
import config from '../_common/config';
import schema from './examples/schemas/tables';
import { expect } from 'chai';

const { DATASET_NAME, TABLE_NAME } = config;

describe('Tables', function() {
  before(async function() {
    await commands.createDatasets(DATASET_NAME);
  });

  after(async function() {
    await commands.cleanupDatasets(DATASET_NAME);
  });

  it('checks for a table does not exist', async function() {
    const [realShouldNotExists, fakeShouldNotExists] =
      await commands.runEverywhere(async conn => (await conn.dataset(DATASET_NAME).table(TABLE_NAME).exists())[0]);
    expect(realShouldNotExists).to.be.false;
    expect(fakeShouldNotExists).to.be.false;
  });

  it('gets empty table list', async function() {
    const [realTablesEmpty, fakeTablesEmpty] =
      await commands.runEverywhere(async conn => conn.dataset(DATASET_NAME).getTables());
    expect(fakeTablesEmpty).to.be.eql(realTablesEmpty);
  });

  it('creates table that does not exist', async function() {
    const [realCreateTableResult, fakeCreateTableResult] =
      await commands.runEverywhere(async conn => conn.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema }));

    const createTableAttributes = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeCreateTableResult[0], createTableAttributes))
      .to.be.eql(pick(realCreateTableResult[0], createTableAttributes));
  });

  it('tries to recreate a table that already exist', async function() {
    const [realTableCreateError, fakeTableCreateError] = await commands.runEverywhere(async conn => {
      try {
        await conn.dataset(DATASET_NAME).createTable(TABLE_NAME, { schema });
      } catch (e) {
        return {
          code: e.code,
          errors: e.errors
        };
      }
    });

    expect(fakeTableCreateError).to.be.eql(realTableCreateError);
  });

  it('check get table entity', async function() {
    const [realTableEntity, fakeTableEntity] =
      await commands.runEverywhere(async conn => conn.dataset(DATASET_NAME).table(TABLE_NAME).get());
    const tableAttributes = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeTableEntity[0], tableAttributes))
      .to.be.eql(pick(realTableEntity[0], tableAttributes));
  });

  it('get non-empty table list', async function() {
    const [realTablesNotEmpty, fakeTablesNotEmpty] =
      await commands.runEverywhere(async conn => conn.dataset(DATASET_NAME).getTables());

    const tableAttributes = ['kind', 'id', 'selfLink', 'location', 'tableReference'];
    expect(pick(fakeTablesNotEmpty[0], tableAttributes))
      .to.be.eql(pick(realTablesNotEmpty[0], tableAttributes));
  });
});
