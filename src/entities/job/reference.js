module.exports = class JobReference {
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
};
