'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const TableResponse = require('./response');
const TableReference = require('./reference');

describe('TableResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new TableResponse).to.be.instanceof(BaseEntityResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new TableResponse).to.have.property('TYPE').that.eql('table');
  });

  it('compose the proper object', function() {
    const tableResponse = new TableResponse(
      'projectId', 'datasetId', 'tableId',
      [{ name: 'fieldName', type: 'fieldType' }]
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
    expect(composite).to.have.property('schema').that.eql({ fields: [{ name: 'fieldName', type: 'fieldType' }] });
    expect(composite).to.have.property('numBytes').that.eql('');
    expect(composite).to.have.property('numLongTermBytes').that.eql('');
    expect(composite).to.have.property('numRows').that.eql('');
    expect(composite).to.have.property('creationTime').that.eql('');
    expect(composite).to.have.property('expirationTime').that.eql('');
    expect(composite).to.have.property('lastModifiedTime').that.eql('');

  });
});
