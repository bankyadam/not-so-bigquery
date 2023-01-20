import BaseTableAction from '../baseTableAction';
import TableListResponseObject from '../../../entities/tableList/response';

/**
 * Method: tables.list
 *
 * Lists all tables in the specified dataset. Requires the READER dataset role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/list
 */
export default class TablesListAction extends BaseTableAction {
  async perform() {
    const tables = await this.dataset.getTables();
    return new TableListResponseObject(this.projectId, this.datasetId, tables);
  }
}
