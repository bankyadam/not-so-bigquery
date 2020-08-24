'use strict';

const { pick } = require('lodash');

const { DATASET_NAME } = require('./common/config')();
const bqReal = require('./common/connection-real');
const bqFake = require('./common/connection-fake');

const cleanupDatasets = require('./common/cleanup-datasets');

describe('Datasets', function() {
  after(async function() {
    await cleanupDatasets(DATASET_NAME);
  });

  it('checks for a dataset that does not exist', async function() {
    const realShouldNotExists = (await bqReal.dataset(DATASET_NAME).exists())[0];
    const fakeShouldNotExists = (await bqFake.dataset(DATASET_NAME).exists())[0];

    expect(realShouldNotExists).to.be.false;
    expect(fakeShouldNotExists).to.be.false;
  });

  it('gets empty dataset list', async function() {
    const realDatasetsEmpty = await bqReal.getDatasets();
    const fakeDatasetsEmpty = await bqFake.getDatasets();
    expect(fakeDatasetsEmpty).to.be.eql(realDatasetsEmpty);
  });

  it('creates dataset', async function() {
    const realCreateDatasetResult = await bqReal.createDataset(DATASET_NAME);
    const fakeCreateDatasetResult = await bqFake.createDataset(DATASET_NAME);

    const createDatasetAttributes = ['kind', 'id', 'selfLink', 'location', 'datasetReference'];
    expect(pick(fakeCreateDatasetResult[0], createDatasetAttributes))
      .to.be.eql(pick(realCreateDatasetResult[0], createDatasetAttributes));
  });

  it('checks a dataset that already exists', async function() {
    const realShouldExists = (await bqReal.dataset(DATASET_NAME).exists())[0];
    const fakeShouldExists = (await bqFake.dataset(DATASET_NAME).exists())[0];

    expect(realShouldExists).to.be.true;
    expect(fakeShouldExists).to.be.true;
  });

  it('gets non-empty dataset list', async function() {
    const realDatasets = await bqReal.getDatasets();
    const fakeDatasets = await bqFake.getDatasets();

    const datasetAttributes = ['id', 'location', 'metadata'];
    expect(pick(fakeDatasets[0], datasetAttributes))
      .to.be.eql(pick(realDatasets[0], datasetAttributes));
  });

  it('deletes an existing dataset', async function() {
    const realDeleteDatasetResult = await bqReal.dataset(DATASET_NAME).delete({ force: true });
    const fakeDeleteDatasetResult = await bqFake.dataset(DATASET_NAME).delete({ force: true });

    const deleteDatasetAttributes = [
      'statusMessage',
      'statusCode',
      'body',
      'headers.x-content-type-options',
      'headers.x-frame-options',
      'headers.x-xss-protection'
    ];
    expect(fakeDeleteDatasetResult[0]).to.be.eql(realDeleteDatasetResult[0]);
    expect(pick(fakeDeleteDatasetResult[1], deleteDatasetAttributes))
      .to.be.eql(pick(realDeleteDatasetResult[1], deleteDatasetAttributes));
  });
});
