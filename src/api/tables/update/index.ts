import BaseTableAction from '../baseTableAction';

/**
 * Method: tables.update
 *
 * Updates information in an existing table. The update method replaces the entire
 * Table resource, whereas the patch method only replaces fields that are provided
 * in the submitted Table resource.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/update
 */
export default class TablesUpdateAction extends BaseTableAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
