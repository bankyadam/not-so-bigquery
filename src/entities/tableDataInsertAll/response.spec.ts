import BaseResponse from '../baseResponse';
import TableDataInsertAllResponse from './response';
import { expect } from 'chai';

describe('TableDataInsertAllResponse', function() {
  it('extends BaseResponse', function() {
    expect(new TableDataInsertAllResponse).to.be.instanceof(BaseResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TableDataInsertAllResponse).to.have.property('TYPE').that.eql('tableDataInsertAllResponse');
  });
});
