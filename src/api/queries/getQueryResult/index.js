'use strict';

const BaseJsonResponse = require('../../baseJsonAction');
const pageResult = require('../../../lib/db/pageResult');
const QueryResultResponseObject = require('../../../entities/queryResult/response');

/**
 * Method: jobs.getQueryResults
 *
 * RPC to get the results of a query job.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/getQueryResults
 */
class JobsGetQueryResultAction extends BaseJsonResponse {
  async perform() {
    const projectId = this._req.params.projectId;
    const jobId = this._req.params.jobId;
    const location = this._req.query.location;

    const { data, totalRows, nextPageToken, fields } = await pageResult(null, null, null, null, jobId);
    return new QueryResultResponseObject(projectId, jobId, location, data, totalRows, nextPageToken, fields);
  }
}

module.exports = JobsGetQueryResultAction;
