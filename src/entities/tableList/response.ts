import BaseEntityResponse from '../baseEntityResponse';
import TableResponse from '../table/response';

export default class TableListResponseObject extends BaseEntityResponse {
  TYPE = 'tableList';

  private readonly projectId: string;
  private readonly datasetId: string;
  private readonly tableIds: string[];

  constructor(projectId, datasetId, tableIds) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableIds = tableIds || [];
  }

  compose() {
    return { tables: this.tables() };
  }

  private tables() {
    return this.tableIds.map(tableId => new TableResponse(this.projectId, this.datasetId, tableId));
  }
}
