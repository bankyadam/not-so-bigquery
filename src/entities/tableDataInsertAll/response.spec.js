'use strict';

const BaseResponse = require('../baseResponse');
const TableDataInsertAllResponse = require('./response');

describe('TableDataInsertAllResponse', function() {
  it('extends BaseResponse', function() {
    expect(new TableDataInsertAllResponse).to.be.instanceof(BaseResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TableDataInsertAllResponse).to.have.property('TYPE').that.eql('tableDataInsertAllResponse');
  });
});
