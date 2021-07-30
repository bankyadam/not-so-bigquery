'use strict';

const BaseJsonResponse = require('../../baseJsonAction');
const QueryCache = require('../../../lib/db/queryCache');
const Project = require('../../../lib/bigQuery/project');
const queryTranslator = require('../../../lib/query-translator');
const JobResponseObject = require('../../../entities/job/response');
const JOB_STATUS = require('../../../entities/job/enums/status');

/**
 * Method: jobs.insert
 *
 * Starts a new asynchronous job.
 *
 * This API has two different kinds of endpoint URIs, as this method supports a
 * variety of use cases.
 *
 * - The Metadata URI is used for most interactions, as it accepts the job configuration
 *   directly.
 * - The Upload URI is ONLY for the case when you're sending both a load job configuration
 *   and a data stream together. In this case, the Upload URI accepts the job configuration
 *   and the data as two distinct multipart MIME parts.

 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/insert
 */
class JobsInsertAction extends BaseJsonResponse {
  async perform() {
    const configuration = this._req.body.configuration;
    const jobReference = this._req.body.jobReference;

    if (configuration.query.useLegacySql) {
      this._sendResponseWithStatus(406);
    }

    const projectId = this._req.params.projectId;

    const bqQuery = configuration.query.query;
    const pgQuery = queryTranslator(bqQuery, new Project(projectId).internalId);
    const queryCache = new QueryCache();
    await queryCache.run(pgQuery, null, jobReference.jobId);

    return new JobResponseObject(projectId, jobReference.jobId, jobReference.location, configuration, JOB_STATUS.DONE);
  }
}

module.exports = JobsInsertAction;
