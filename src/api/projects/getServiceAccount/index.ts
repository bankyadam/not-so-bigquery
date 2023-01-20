import BaseProjectAction from '../baseProjectAction';

/**
 * Method: projects.getServiceAccount
 *
 * RPC to get the service account for a project used for interactions with Google CloudKMS
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/projects/getServiceAccount
 */
export default class ProjectsGetServiceAccountAction extends BaseProjectAction {
  async perform() {
    this.sendResponseWithStatus(501);
  }
}
