'use strict';

const BaseTableAction = require('../baseTableAction');

/**
 * Method: tables.patch
 *
 * Updates information in an existing table. The update method replaces the entire
 * table resource, whereas the patch method only replaces fields that are provided
 * in the submitted table resource. This method supports RFC5789 patch semantics.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/patch
 */
class TablesPatchAction extends BaseTableAction {
}

module.exports = TablesPatchAction;
