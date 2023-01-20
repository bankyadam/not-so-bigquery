import { expect } from 'chai';
import { JOB_STATUS } from './status';

describe('Job Enums Status', function() {
  it('has proper statuses', function() {
    expect(JOB_STATUS.PENDING).to.be.eql('PENDING');
    expect(JOB_STATUS.RUNNING).to.be.eql('RUNNING');
    expect(JOB_STATUS.DONE).to.be.eql('DONE');
  });
});
