import IBaseReference from '../iBaseReference';

export default class TableReference implements IBaseReference {
  private readonly projectId: string;
  private readonly datasetId: string;
  private readonly tableId: string;

  constructor(projectId, datasetId, tableId) {
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableId = tableId;
  }

  get ID() {
    return `${this.projectId}:${this.datasetId}.${this.tableId}`;
  }

  toJSON() {
    return {
      projectId: this.projectId,
      datasetId: this.datasetId,
      tableId: this.tableId
    };
  }
}
