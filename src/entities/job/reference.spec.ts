import JobReference from './reference';
import { expect } from 'chai';

const subject = new JobReference('projectId', 'jobId', 'location');

describe('JobResponse', function() {
  it('.ID', function() {
    expect(subject).to.have.property('ID').that.is.eql('projectId:location.jobId');
  });

  it('.toJSON', function() {
    expect(subject.toJSON()).to.be.eql({
      projectId: 'projectId',
      jobId: 'jobId',
      location: 'location'
    });
  });
});
