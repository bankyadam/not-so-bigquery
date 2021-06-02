'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const DatasetListResponseObject = require('./response');
const DatasetResponseObject = require('../dataset/response');

describe('DatasetListResponseObject', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new DatasetListResponseObject).to.be.instanceof(BaseEntityResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new DatasetListResponseObject).to.have.property('TYPE').that.eql('datasetList');
  });

  it('returns empty dataset', function() {
    const response = new DatasetListResponseObject('projectId', []);
    expect(response.compose()).to.have.property('datasets').that.is.an('array').and.lengthOf(0);
  });

  it('returns given dataset', function() {
    const response = new DatasetListResponseObject('projectId', ['datasetId1']);
    const composite = response.compose();
    expect(composite).to.have.property('datasets').that.is.an('array').and.lengthOf(1);
    expect(composite.datasets[0]).to.be.eql(new DatasetResponseObject('projectId', 'datasetId1'));
  });

  it('returns given datasets', function() {
    const response = new DatasetListResponseObject('projectId', ['datasetId1', 'datasetId2']);
    const composite = response.compose();
    expect(composite).to.have.property('datasets').that.is.an('array').and.lengthOf(2);
    expect(composite.datasets[0]).to.be.eql(new DatasetResponseObject('projectId', 'datasetId1'));
    expect(composite.datasets[1]).to.be.eql(new DatasetResponseObject('projectId', 'datasetId2'));
  });
});
