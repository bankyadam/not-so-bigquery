import BaseTableAction from '../baseTableAction';
import TableResponseObject from '../../../entities/table/response';

/**
 * Method: tables.get
 *
 * Gets the specified table resource by table ID. This method does not return the data
 * in the table, it only returns the table resource, which describes the structure of
 * this table.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/get
 */
export default class TablesGetAction extends BaseTableAction {
  async perform() {
    await this.tableShouldExist();

    const fields = await this.table.fields();
    return new TableResponseObject(this.projectId, this.datasetId, this.tableId, fields);
  }
}
