'use strict';

const BaseDatasetAction = require('../baseDatasetAction');
const DatasetResponseObject = require('../../../entities/dataset/response');

/**
 * Method: datasets.insert
 *
 * Creates a new empty dataset.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/insert
 */
class DatasetsInsertAction extends BaseDatasetAction {
  get _datasetId() {
    return this._req.body.datasetReference.datasetId;
  }

  async perform() {
    await this._datasetShouldNotExist();

    await this._dataset.create();
    return new DatasetResponseObject(this._projectId, this._datasetId);
  }
}

module.exports = DatasetsInsertAction;
