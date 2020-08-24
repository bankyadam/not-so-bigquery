'use strict';

const BaseAction = require('../../baseAction');

/**
 * Method: jobs.query
 *
 * Runs a BigQuery SQL query synchronously and returns query results if the query completes within a specified timeout.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
 */
class JobsQueryAction extends BaseAction {
}

module.exports = JobsQueryAction;
