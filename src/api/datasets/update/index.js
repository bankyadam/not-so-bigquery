'use strict';

const BaseDatasetAction = require('../baseDatasetAction');

/**
 * Method: datasets.update
 *
 * Updates information in an existing dataset. The update method replaces the entire
 * dataset resource, whereas the patch method only replaces fields that are provided
 * in the submitted dataset resource.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/update
 */
class DatasetsUpdateAction extends BaseDatasetAction {
}

module.exports = DatasetsUpdateAction;
