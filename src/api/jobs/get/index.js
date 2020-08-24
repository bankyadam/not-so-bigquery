'use strict';

const BaseAction = require('../../baseAction');

/**
 * Method: jobs.get
 *
 * Returns information about a specific job. Job information is available for a
 * six month period after creation. Requires that you're the person who ran the job,
 * or have the Is Owner project role.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/get
 */
class JobsGetAction extends BaseAction {
}

module.exports = JobsGetAction;
