'use strict';

describe('Job Enums Status', function() {
  it('has proper statuses', function() {
    expect(require('./status')).to.be.eql({
      PENDING: 'PENDING',
      RUNNING: 'RUNNING',
      DONE: 'DONE'
    });
  });
});
