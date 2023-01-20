import BaseTableAction from '../baseTableAction';
import TableDataListResponseObject from '../../../entities/tableDataList/response';

/**
 * Method: tabledata.list
 *
 * tabledata.list the content of a table in rows.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tabledata/list
 *
 * @todo handle `startIndex`    string
 *                              Start row index of the table.
 *
 * @todo handle `formatOptions` object (DataFormatOptions)
 *                              Output timestamp field value in usec int64 instead of double. Output format adjustments.
 */
export default class TablesDataAction extends BaseTableAction {
  async perform() {
    await this.tableShouldExist();

    const maxResults = parseInt(<string> this.req.query.maxResults, 10) || 100000;
    const pageToken = <string> this.req.query.pageToken || null;
    // const selectedFields = this._req.query.selectedFields

    const { data, totalRows, nextPageToken, fields } = await this.table.getData({ maxResults, pageToken });
    return new TableDataListResponseObject(data, totalRows, nextPageToken, fields);
  }
}
