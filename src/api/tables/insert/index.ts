import BaseTableAction from '../baseTableAction';
import TableResponseObject from '../../../entities/table/response';

/**
 * Method: tables.insert
 *
 * Creates a new, empty table in the dataset.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/insert
 */
export default class TablesInsertAction extends BaseTableAction {
  get tableId() {
    return this.req.body.tableReference.tableId;
  }

  async perform() {
    await this.tableShouldNotExist();

    const schema = this.req.body.schema;
    await this.table.create(schema.fields);
    return new TableResponseObject(this.projectId, this.datasetId, this.tableId);
  }
}
