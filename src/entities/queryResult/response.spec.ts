import BaseEntityResponse from '../baseEntityResponse';
import QueryResultResponse from './response';
import JobReference from '../job/reference';
import { expect } from 'chai';
import { POSTGRES_TYPES } from '../../lib/bigQuery/types';
import { FieldType } from '../../lib/db/types/fieldType';

describe('QueryResultResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new QueryResultResponse('p', 'j')).to.be.instanceof(BaseEntityResponse);
  });

  it('has proper TYPE set', function() {
    expect(new QueryResultResponse('p', 'j')).to.have.property('TYPE').that.eql('getQueryResultsResponse');
  });

  it('compose the proper object', function() {
    const queryResultResponse = new QueryResultResponse('projectId', 'jobId', 'location',
      [{ }], 1234, 'pageToken', [{ name: 'fieldName', type: POSTGRES_TYPES.TEXT, mode: FieldType.NULLABLE }]);
    const composite = queryResultResponse.compose();

    expect(composite).to.have.property('totalRows').that.eql(1234);
    expect(composite).to.have.property('rows').that.eql([{ f: [] }]);
    expect(composite).to.have.property('pageToken').that.eql('pageToken');
    expect(composite).to.have.property('schema').that
      .eql({ fields: [{ name: 'fieldName', type: POSTGRES_TYPES.TEXT, mode: FieldType.NULLABLE }] });
    expect(composite).to.have.property('jobReference')
      .that.eql(new JobReference('projectId', 'jobId', 'location'));
    expect(composite).to.have.property('totalBytesProcessed').that.eql(0);
    expect(composite).to.have.property('jobComplete').that.eql(true);
    expect(composite).to.have.property('errors').that.eql([]);
    expect(composite).to.have.property('cacheHit').that.eql(true);

  });
});
