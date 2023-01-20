import BaseAction from '../../baseAction';

/**
 * Method: jobs.query
 *
 * Runs a BigQuery SQL query synchronously and returns query results if the query
 * completes within a specified timeout.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
 */
export default class JobsQueryAction extends BaseAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
