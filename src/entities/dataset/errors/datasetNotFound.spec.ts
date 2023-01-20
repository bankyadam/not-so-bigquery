import DatasetNotFoundError from './datasetNotFound';
import { expect } from 'chai';

const subject = new DatasetNotFoundError('projectId', 'datasetId');

describe('DatasetNotFoundError', function() {
  it('.errorCode', function() {
    expect(subject).has.property('errorCode').that.eql(404);
  });

  it('.status', function() {
    expect(subject).has.property('status').that.eql('NOT_FOUND');
  });

  it('.reason', function() {
    expect(subject).has.property('reason').that.eql('notFound');
  });

  it('.message', function() {
    expect(subject).has.property('message').that.eql('Not found: Dataset projectId:datasetId');
  });
});
