import BaseDatasetAction from '../baseDatasetAction';
import DatasetResponseObject from '../../../entities/dataset/response';

/**
 * Method: datasets.get
 *
 * Returns the dataset specified by datasetID.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/get
 */
export default class DatasetsGetAction extends BaseDatasetAction {
  async perform() {
    await this.datasetShouldExist();
    return new DatasetResponseObject(this.projectId, this.datasetId);
  }
}
