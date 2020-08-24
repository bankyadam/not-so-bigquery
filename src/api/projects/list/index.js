'use strict';

const BaseProjectAction = require('../baseProjectAction');

/**
 * Method: projects.list
 *
 * RPC to list projects to which the user has been granted any project role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/projects/list
 */
class ProjectsListAction extends BaseProjectAction {
}

module.exports = ProjectsListAction;
