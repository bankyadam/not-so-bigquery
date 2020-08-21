const BaseTableAction = require('../baseTableAction');
const TableDataListResponseObject = require('../../../entities/tableDataList/response');

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
class TablesDataAction extends BaseTableAction {
  async perform() {
    await this._tableShouldExist();

    const maxResults = parseInt(this._req.query.maxResults, 10) || 100000;
    const pageToken = this._req.query.pageToken || null;
    // const selectedFields = this._req.query.selectedFields

    const { totalRows, data, nextPageToken } = await this._table.getData({ maxResults, pageToken });
    this._res.json(new TableDataListResponseObject(data, totalRows, nextPageToken));
  }
}

module.exports = TablesDataAction.createHandler();
