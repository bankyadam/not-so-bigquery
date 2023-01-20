import BaseDatasetAction from '../baseDatasetAction';
import DatasetListResponseObject from '../../../entities/datasetList/response';

/**
 * Method: datasets.list
 *
 * Lists all datasets in the specified project to which the user has been granted the
 * READER dataset role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/list
 */
export default class DatasetsListAction extends BaseDatasetAction {
  async perform() {
    const datasets = await this.project.getDatasets();
    return new DatasetListResponseObject(this.projectId, datasets);
  }
}
