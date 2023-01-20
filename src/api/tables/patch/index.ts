import BaseTableAction from '../baseTableAction';

/**
 * Method: tables.patch
 *
 * Updates information in an existing table. The update method replaces the entire
 * table resource, whereas the patch method only replaces fields that are provided
 * in the submitted table resource. This method supports RFC5789 patch semantics.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tables/patch
 */
export default class TablesPatchAction extends BaseTableAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
