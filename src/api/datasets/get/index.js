'use strict';

const BaseDatasetAction = require('../baseDatasetAction');
const DatasetResponseObject = require('../../../entities/dataset/response');

/**
 * Method: datasets.get
 *
 * Returns the dataset specified by datasetID.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/get
 */
class DatasetsGetAction extends BaseDatasetAction {
  async perform(params) {
    await this._datasetShouldExist();
    return new DatasetResponseObject(this._projectId, this._datasetId);
  }
}

module.exports = DatasetsGetAction;
