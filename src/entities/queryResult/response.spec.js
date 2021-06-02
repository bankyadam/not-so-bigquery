'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const QueryResultResponse = require('./response');
const JobReference = require('../job/reference');

describe('QueryResultResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new QueryResultResponse).to.be.instanceof(BaseEntityResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new QueryResultResponse).to.have.property('TYPE').that.eql('getQueryResultsResponse');
  });

  it('compose the proper object', function() {
    const queryResultResponse = new QueryResultResponse('projectId', 'jobId', 'location',
      [{ }], 1234, 'pageToken', [{ name: 'fieldName', type: 'fieldType' }]);
    const composite = queryResultResponse.compose();

    expect(composite).to.have.property('totalRows').that.eql(1234);
    expect(composite).to.have.property('rows').that.eql([{ f: [] }]);
    expect(composite).to.have.property('pageToken').that.eql('pageToken');
    expect(composite).to.have.property('schema').that.eql({ fields: [{ name: 'fieldName', type: 'fieldType' }] });
    expect(composite).to.have.property('jobReference')
      .that.eql(new JobReference('projectId', 'jobId', 'location'));
    expect(composite).to.have.property('totalBytesProcessed').that.eql(0);
    expect(composite).to.have.property('jobComplete').that.eql(true);
    expect(composite).to.have.property('errors').that.eql([]);
    expect(composite).to.have.property('cacheHit').that.eql(true);

  });
});
