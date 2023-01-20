import BaseEntityResponse from '../baseEntityResponse';
import JobReference from './reference';
import { JOB_STATUS } from './enums/status';

export default class JobResponse extends BaseEntityResponse {
  TYPE = 'job';

  private readonly projectId: string;
  private readonly jobId: string;
  private readonly location: string;
  private readonly configuration: unknown;
  private readonly state: JOB_STATUS;

  constructor(projectId, jobId, location = 'EU', configuration = null, state: JOB_STATUS = JOB_STATUS.DONE) {
    super();
    this.projectId = projectId;
    this.jobId = jobId;
    this.location = location;
    this.configuration = configuration;
    this.state = state;
  }

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
}
