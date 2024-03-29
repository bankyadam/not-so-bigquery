import BaseAction from '../../baseAction';

/**
 * Method: jobs.list
 *
 * Lists all jobs that you started in the specified project. Job information is available for a six month period after
 * creation. The job list is sorted in reverse chronological order, by job creation time. Requires the Can View project
 * role, or the Is Owner project role if you set the allUsers property.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/list
 */
export default class JobsListAction extends BaseAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
