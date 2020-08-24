'use strict';

const { pageResult } = require('../../../db');
const QueryResultResponseObject = require('../../../entities/queryResult/response');

/**
 * Method: jobs.getQueryResults
 *
 * RPC to get the results of a query job.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/getQueryResults
 */
module.exports = async (req, res) => {
  const projectId = req.params.projectId;
  const jobId = req.params.jobId;
  const location = req.query.location;

  const { data, totalRows, nextPageToken, fields } = await pageResult(null, null, null, null, jobId);
  res.json(new QueryResultResponseObject(projectId, jobId, location, data, totalRows, nextPageToken, fields));
};
