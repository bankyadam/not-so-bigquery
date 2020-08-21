const BaseTableAction = require('../baseTableAction');
const TableResponseObject = require('../../../entities/table/response');

/**
 * Method: tables.get
 *
 * Gets the specified table resource by table ID. This method does not return the data
 * in the table, it only returns the table resource, which describes the structure of
 * this table.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/get
 */
class TablesGetAction extends BaseTableAction {
  async perform() {
    await this._tableShouldExist();

    const fields = await this._table.fields();
    this._res.json(new TableResponseObject(this._projectId, this._datasetId, this._tableId, fields));
  }
}

module.exports = TablesGetAction.createHandler();
