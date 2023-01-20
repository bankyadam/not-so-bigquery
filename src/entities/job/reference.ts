import IBaseReference from '../iBaseReference';

export default class JobReference implements IBaseReference {
  private readonly projectId: string;
  private readonly jobId: string;
  private readonly location: string;

  constructor(projectId, jobId, location) {
    this.projectId = projectId;
    this.jobId = jobId;
    this.location = location;
  }

  get ID() {
    return `${this.projectId}:${this.location}.${this.jobId}`;
  }

  toJSON() {
    return {
      projectId: this.projectId,
      jobId: this.jobId,
      location: this.location
    };
  }
}
