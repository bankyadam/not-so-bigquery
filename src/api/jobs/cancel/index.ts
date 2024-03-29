import BaseAction from '../../baseAction';

/**
 * Method: jobs.cancel
 *
 * Requests that a job be cancelled. This call will return immediately, and the
 * client will need to poll for the job status to see if the cancel completed
 * successfully. Cancelled jobs may still incur costs.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/cancel
 */
export default class JobsCancelAction extends BaseAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
