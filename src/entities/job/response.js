'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const JobReference = require('./reference');

module.exports = class JobResponseObject extends BaseEntityResponseObject {
  constructor(projectId, jobId, location, configuration, state) {
    super();
    this.projectId = projectId;
    this.jobId = jobId;
    this.location = location;
    this.configuration = configuration;
    this.state = state;
  }

  get TYPE() { return 'job'; };

  get REFERENCE() {
    return new JobReference(this.projectId, this.jobId, this.location);
  }

  compose() {
    return {
      id: this.REFERENCE.ID,
      jobReference: this.REFERENCE,
      // eslint-disable-next-line max-len
      selfLink: `https://bigquery.googleapis.com/bigquery/v2/projects/${this.projectId}/jobs/${this.jobId}?location=${this.location}`,
      configuration: this.configuration,
      statistics: {},
      status: {
        state: this.state
      }
    };
  }
};
