import BaseAction from '../../baseAction';

/**
 * Method: jobs.get
 *
 * Returns information about a specific job. Job information is available for a
 * six month period after creation. Requires that you're the person who ran the job,
 * or have the Is Owner project role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/get
 */
export default class JobsGetAction extends BaseAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
