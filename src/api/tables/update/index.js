'use strict';

const BaseTableAction = require('../baseTableAction');

/**
 * Method: tables.update
 *
 * Updates information in an existing table. The update method replaces the entire
 * Table resource, whereas the patch method only replaces fields that are provided
 * in the submitted Table resource.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/update
 */
class TablesUpdateAction extends BaseTableAction {
}

module.exports = TablesUpdateAction;
