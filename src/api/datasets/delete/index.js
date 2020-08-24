'use strict';

const BaseDatasetAction = require('../baseDatasetAction');

/**
 * Method: datasets.delete
 *
 * Deletes the dataset specified by the datasetId value. Before you can delete a dataset,
 * you must delete all its tables, either manually or by specifying deleteContents.
 * Immediately after deletion, you can create another dataset with the same name.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/delete
 */
class DatasetsGetAction extends BaseDatasetAction {
  async perform() {
    await this._datasetShouldExist();

    await this._dataset.delete(this._req.query.deleteContents === 'true');
    this._sendResponseWithStatus(204);
  }
}

module.exports = DatasetsGetAction;
