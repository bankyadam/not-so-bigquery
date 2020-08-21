module.exports = class DatasetReference {
  constructor(projectId, datasetId) {
    this.projectId = projectId;
    this.datasetId = datasetId;
  }

  get ID() {
    return `${this.projectId}:${this.datasetId}`;
  }

  toJSON() {
    return {
      projectId: this.projectId,
      datasetId: this.datasetId
    };
  }
};
