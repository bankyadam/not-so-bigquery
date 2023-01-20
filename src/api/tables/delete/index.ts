import BaseTableAction from '../baseTableAction';

/**
 * Method: tables.delete
 *
 * Deletes the table specified by tableId from the dataset. If the table contains data,
 * all the data will be deleted.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/delete
 */
export default class TablesDeleteAction extends BaseTableAction {
  async perform() {
    await this.tableShouldExist();

    await this.table.delete();
    this.sendResponseWithStatus(204);
  }
}
