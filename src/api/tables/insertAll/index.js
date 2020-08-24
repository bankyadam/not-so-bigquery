'use strict';

const BaseTableAction = require('../baseTableAction');
const TableDataInsertAllResponseObject = require('../../../entities/tableDataInsertAll/response');

/**
 * Method: tabledata.insertAll
 *
 * Streams data into BigQuery one record at a time without needing to run a load job.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/tabledata/insertAll
 *
 * @todo handle `skipInvalidRows`     boolean
 *                                    [Optional] Insert all valid rows of a request, even if invalid rows exist. The
 *                                    default value is false, which causes the entire request to fail if any invalid
 *                                    rows exist.
 *
 * @todo handle `ignoreUnknownValues` boolean
 *                                    [Optional] Accept rows that contain values that do not match the schema. The
 *                                    unknown values are ignored. Default is false, which treats unknown values as
 *                                    errors.
 *
 * @todo handle `templateSuffix`      string
 *                                    If specified, treats the destination table as a base template, and inserts the
 *                                    rows into an instance table named "{destination}{templateSuffix}". BigQuery
 *                                    will manage creation of the instance table, using the schema of the base
 *                                    template table.
 */
class TablesInsertAllAction extends BaseTableAction {
  async perform() {
    await this._tableShouldExist();

    const rows = this._req.body.rows;
    for (let i = 0; i < rows.length; i++) {
      await this._table.insertRow(rows[i].json);
    }

    return new TableDataInsertAllResponseObject();
  }
}

module.exports = TablesInsertAllAction;
