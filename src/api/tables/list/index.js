'use strict';

const BaseTableAction = require('../baseTableAction');
const TableListResponseObject = require('../../../entities/tableList/response');

/**
 * Method: tables.list
 *
 * Lists all tables in the specified dataset. Requires the READER dataset role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/list
 */
class TablesListAction extends BaseTableAction {
  async perform() {
    const tables = await this._dataset.getTables();
    return new TableListResponseObject(this._projectId, this._datasetId, tables);
  }
}

module.exports = TablesListAction;
