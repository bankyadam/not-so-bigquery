import IBaseReference from '../iBaseReference';

export default class DatasetReference implements IBaseReference {
  private readonly projectId: string;
  private readonly datasetId: string;

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
}
