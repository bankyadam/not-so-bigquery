import BaseEntityResponse from '../baseEntityResponse';
import TableListResponse from './response';
import TableResponseObject from '../table/response';
import { expect } from 'chai';

describe('TableListResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new TableListResponse('p', 'd', 't')).to.be.instanceof(BaseEntityResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TableListResponse('p', 'd', 't')).to.have.property('TYPE').that.eql('tableList');
  });

  it('empty data', function() {
    const subject = new TableListResponse('projectId', 'datasetId', null);
    expect(subject.compose()).to.be.eql({ tables: [] });
  });

  it('with data', function() {
    const subject = new TableListResponse('projectId', 'datasetId', ['tableId1', 'tableId2']);

    expect(subject.compose()).to.be.eql({
      tables: [
        new TableResponseObject('projectId', 'datasetId', 'tableId1'),
        new TableResponseObject('projectId', 'datasetId', 'tableId2')
      ]
    });
  });
});
