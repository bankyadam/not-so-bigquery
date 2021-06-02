'use strict';

const TableAlreadyExistError = require('./tableAlreadyExists');
const subject = new TableAlreadyExistError('projectId', 'datasetId', 'tableId');

describe('TableAlreadyExistError', function() {
  it('.errorCode', function() {
    expect(subject).has.property('errorCode').that.eql(409);
  });

  it('.status', function() {
    expect(subject).has.property('status').that.eql('ALREADY_EXISTS');
  });

  it('.reason', function() {
    expect(subject).has.property('reason').that.eql('duplicate');
  });

  it('.message', function() {
    expect(subject).has.property('message').that.eql('Already Exists: Table projectId:datasetId.tableId');
  });
});
