const BaseTableAction = require('../baseTableAction');
const TableResponseObject = require('../../../entities/table/response');

/**
 * Method: tables.insert
 *
 * Creates a new, empty table in the dataset.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/insert
 */
class TablesInsertAction extends BaseTableAction {
  get _tableId() {
    return this._req.body.tableReference.tableId;
  }

  async perform() {
    await this._tableShouldNotExist();

    const schema = this._req.body.schema;
    await this._table.create(schema.fields);
    this._res.json(new TableResponseObject(this._projectId, this._datasetId, this._tableId));
  }
}

module.exports = TablesInsertAction.createHandler();
