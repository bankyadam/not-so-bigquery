const BaseDatasetAction = require('../baseDatasetAction');

/**
 * Method: datasets.patch
 *
 * Updates information in an existing dataset. The update method replaces the entire
 * dataset resource, whereas the patch method only replaces fields that are provided
 * in the submitted dataset resource. This method supports RFC5789 patch semantics.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/datasets/patch
 */
class DatasetsPatchAction extends BaseDatasetAction {
}

module.exports = DatasetsPatchAction.createHandler();
