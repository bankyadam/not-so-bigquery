'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const JobResponse = require('./response');
const JobReference = require('./reference');

describe('JobResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new JobResponse).to.be.instanceof(BaseEntityResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new JobResponse).to.have.property('TYPE').that.eql('job');
  });

  it('compose the proper object', function() {
    const jobResponse = new JobResponse('projectId', 'jobId', 'location', 'configuration', 'state');
    const reference = new JobReference('projectId', 'jobId', 'location');
    const composite = jobResponse.compose();

    expect(composite).to.have.property('id').that.eql(reference.ID);
    expect(composite).to.have.property('jobReference').that.eql(reference);
    expect(composite).to.have.property('selfLink')
      .that.eql('https://bigquery.googleapis.com/bigquery/v2/projects/projectId/jobs/jobId?location=location');
    expect(composite).to.have.property('configuration').that.eql('configuration');
    expect(composite).to.have.property('statistics').that.eql({});
    expect(composite).to.have.property('status').that.eql({ state: 'state' });
  });
});
