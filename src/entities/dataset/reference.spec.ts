import DatasetReference from './reference';
import { expect } from 'chai';

const subject = new DatasetReference('projectId', 'datasetId');

describe('DatasetResponse', function() {
  it('.ID', function() {
    expect(subject).to.have.property('ID').that.is.eql('projectId:datasetId');
  });

  it('.toJSON', function() {
    expect(subject.toJSON()).to.be.eql({
      projectId: 'projectId',
      datasetId: 'datasetId'
    });
  });
});
