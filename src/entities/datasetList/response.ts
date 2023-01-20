import BaseEntityResponse from '../baseEntityResponse';
import DatasetResponse from '../dataset/response';

class DatasetListResponseObject extends BaseEntityResponse {
  TYPE = 'datasetList';

  private readonly projectId: string;
  private readonly datasetIds: string[];

  constructor(projectId, datasetIds: string[] = []) {
    super();
    this.projectId = projectId;
    this.datasetIds = datasetIds;
  }

  compose() {
    return { datasets: this.composeDatasetResponses() };
  }

  private composeDatasetResponses() {
    return this.datasetIds.map(datasetId => new DatasetResponse(this.projectId, datasetId));
  }
}

export default DatasetListResponseObject;
