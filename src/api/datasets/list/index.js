'use strict';

const BaseDatasetAction = require('../baseDatasetAction');
const DatasetListResponseObject = require('../../../entities/datasetList/response');

/**
 * Method: datasets.list
 *
 * Lists all datasets in the specified project to which the user has been granted the
 * READER dataset role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/list
 */
class DatasetsListAction extends BaseDatasetAction {
  async perform() {
    const datasets = await this._project.getDatasets();
    return new DatasetListResponseObject(this._projectId, datasets);
  }
}

module.exports = DatasetsListAction;
