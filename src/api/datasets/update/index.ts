import BaseDatasetAction from '../baseDatasetAction';

/**
 * Method: datasets.update
 *
 * Updates information in an existing dataset. The update method replaces the entire
 * dataset resource, whereas the patch method only replaces fields that are provided
 * in the submitted dataset resource.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/update
 */
export default class DatasetsUpdateAction extends BaseDatasetAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
