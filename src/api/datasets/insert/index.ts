import BaseDatasetAction from '../baseDatasetAction';
import DatasetResponseObject from '../../../entities/dataset/response';

/**
 * Method: datasets.insert
 *
 * Creates a new empty dataset.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/insert
 */
export default class DatasetsInsertAction extends BaseDatasetAction {
  get datasetId() {
    return this.req.body.datasetReference.datasetId;
  }

  async perform() {
    await this.datasetShouldNotExist();

    await this.dataset.create();
    return new DatasetResponseObject(this.projectId, this.datasetId);
  }
}
