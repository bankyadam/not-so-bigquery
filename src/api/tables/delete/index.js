const BaseTableAction = require('../baseTableAction');

/**
 * Method: tables.delete
 *
 * Deletes the table specified by tableId from the dataset. If the table contains data,
 * all the data will be deleted.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/delete
 */
class TablesGetAction extends BaseTableAction {
  async perform() {
    await this._tableShouldExist();

    await this._table.delete();
    this._res.sendStatus(204);
  }
}

module.exports = TablesGetAction.createHandler();
