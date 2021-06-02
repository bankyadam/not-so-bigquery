'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const DatasetResponse = require('./response');
const DatasetReference = require('./reference');
const datasetResponse = new DatasetResponse('projectId', 'datasetId');
const reference = new DatasetReference('projectId', 'datasetId');

describe('DatasetResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new DatasetResponse).to.be.instanceof(BaseEntityResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new DatasetResponse).to.have.property('TYPE').that.eql('dataset');
  });

  it('compose the proper object', function() {
    const composite = datasetResponse.compose();

    expect(composite).to.have.property('id').that.eql(reference.ID);
    expect(composite).to.have.property('datasetReference').that.eql(reference);
    expect(composite).to.have.property('selfLink').that.eql('');
    expect(composite).to.have.property('labels').that.eql({});
    expect(composite).to.have.property('friendlyName').that.eql('');
    expect(composite).to.have.property('description').that.eql('');
    expect(composite).to.have.property('location').that.eql('US');
    expect(composite).to.have.property('defaultTableExpirationMs').that.eql('');
    expect(composite).to.have.property('defaultPartitionExpirationMs').that.eql('');
    expect(composite).to.have.property('creationTime').that.eql('');
    expect(composite).to.have.property('lastModifiedTime').that.eql('');
  });
});
