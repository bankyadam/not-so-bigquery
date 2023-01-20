import BaseDatasetAction from '../baseDatasetAction';

/**
 * Method: datasets.delete
 *
 * Deletes the dataset specified by the datasetId value. Before you can delete a dataset,
 * you must delete all its tables, either manually or by specifying deleteContents.
 * Immediately after deletion, you can create another dataset with the same name.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/delete
 */
export default class DatasetsDeleteAction extends BaseDatasetAction {
  async perform() {
    await this.datasetShouldExist();

    await this.dataset.delete(this.req.query.deleteContents === 'true');
    return {};
  }
}
