'use strict';

const TableReference = require('./reference');
const subject = new TableReference('projectId', 'datasetId', 'tableId');

describe('TableResponse', function() {
  it('.ID', function() {
    expect(subject).to.have.property('ID').that.is.eql('projectId:datasetId.tableId');
  });

  it('.toJSON', function() {
    expect(subject.toJSON()).to.be.eql({
      projectId: 'projectId',
      datasetId: 'datasetId',
      tableId: 'tableId'
    });
  });
});
