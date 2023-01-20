import BaseEntityResponse from '../baseEntityResponse';
import TableResponse from './response';
import TableReference from './reference';
import { expect } from 'chai';
import { POSTGRES_TYPES } from '../../lib/bigQuery/types';
import { FieldType } from '../../lib/db/types/fieldType';

describe('TableResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new TableResponse('p', 'd', 't', [])).to.be.instanceof(BaseEntityResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TableResponse('p', 'd', 't', [])).to.have.property('TYPE').that.eql('table');
  });

  it('compose the proper object', function() {
    const tableResponse = new TableResponse(
      'projectId', 'datasetId', 'tableId',
      [{ name: 'fieldName', type: POSTGRES_TYPES.TEXT, mode: FieldType.NULLABLE }]
    );
    const reference = new TableReference('projectId', 'datasetId', 'tableId');
    const composite = tableResponse.compose();

    expect(composite).to.have.property('id').that.eql(reference.ID);
    expect(composite).to.have.property('tableReference').that.eql(reference);
    expect(composite).to.have.property('selfLink')
      .that.eql('https://bigquery.googleapis.com/bigquery/v2/projects/projectId/datasets/datasetId/tables/tableId');
    expect(composite).to.have.property('labels').that.eql({});
    expect(composite).to.have.property('friendlyName').that.eql('');
    expect(composite).to.have.property('description').that.eql('');
    expect(composite).to.have.property('location').that.eql('EU');
    expect(composite).to.have.property('type').that.eql('TABLE');
    expect(composite).to.have.property('schema').that
      .eql({ fields: [{ name: 'fieldName', type: POSTGRES_TYPES.TEXT, mode: FieldType.NULLABLE }] });
    expect(composite).to.have.property('numBytes').that.eql('');
    expect(composite).to.have.property('numLongTermBytes').that.eql('');
    expect(composite).to.have.property('numRows').that.eql('');
    expect(composite).to.have.property('creationTime').that.eql('');
    expect(composite).to.have.property('expirationTime').that.eql('');
    expect(composite).to.have.property('lastModifiedTime').that.eql('');
  });
});
