'use strict';

const { pick } = require('lodash');
const commands = require('../support/commands');
const { DATASET_NAME } = require('../support/config')();

describe('Datasets', function() {
  after(async function() {
    await commands.cleanupDatasets(DATASET_NAME);
  });

  it('checks for a dataset that does not exist', async function() {
    const [realShouldNotExists, fakeShouldNotExists] =
      await commands.runEverywhere(async conn => (await conn.dataset(DATASET_NAME).exists())[0]);

    expect(realShouldNotExists).to.be.false;
    expect(fakeShouldNotExists).to.be.false;
  });

  it('gets empty dataset list', async function() {
    const [realDatasetsEmpty, fakeDatasetsEmpty] = await commands.runEverywhere(async conn => conn.getDatasets());
    expect(fakeDatasetsEmpty).to.be.eql(realDatasetsEmpty);
  });

  it('creates dataset', async function() {
    const [realCreateDatasetResult, fakeCreateDatasetResult] =
      await commands.runEverywhere(async conn => conn.createDataset(DATASET_NAME));

    const createDatasetAttributes = ['kind', 'id', 'selfLink', 'location', 'datasetReference'];
    expect(pick(fakeCreateDatasetResult[0], createDatasetAttributes))
      .to.be.eql(pick(realCreateDatasetResult[0], createDatasetAttributes));
  });

  it('checks a dataset that already exists', async function() {
    const [realShouldExists, fakeShouldExists] =
      await commands.runEverywhere(async conn => (await conn.dataset(DATASET_NAME).exists())[0]);

    expect(realShouldExists).to.be.true;
    expect(fakeShouldExists).to.be.true;
  });

  it('gets non-empty dataset list', async function() {
    const [realDatasets, fakeDatasets] = await commands.runEverywhere(async conn => conn.getDatasets());

    const datasetAttributes = ['id', 'location', 'metadata'];
    expect(pick(fakeDatasets[0], datasetAttributes))
      .to.be.eql(pick(realDatasets[0], datasetAttributes));
  });

  it('deletes an existing dataset', async function() {
    const [realDeleteDatasetResult, fakeDeleteDatasetResult] =
      await commands.runEverywhere(async conn => conn.dataset(DATASET_NAME).delete({ force: true }));

    const deleteDatasetAttributes = [
      'statusMessage',
      'statusCode',
      'body',
      'headers.x-content-type-options',
      'headers.x-frame-options',
      'headers.x-xss-protection'
    ];
    expect(pick(fakeDeleteDatasetResult[1], deleteDatasetAttributes))
      .to.be.eql(pick(realDeleteDatasetResult[1], deleteDatasetAttributes));
  });
});
