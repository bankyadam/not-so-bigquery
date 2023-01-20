import BaseJsonResponse from '../../baseJsonAction';
import QueryResultResponseObject from '../../../entities/queryResult/response';
import { getPageResult } from '../../../lib/db';

/**
 * Method: jobs.getQueryResults
 *
 * RPC to get the results of a query job.
 *
 * @url https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/getQueryResults
 */
export default class JobsGetQueryResultAction extends BaseJsonResponse {
  async perform() {
    const projectId = <string> this.req.params.projectId;
    const jobId = <string> this.req.params.jobId;
    const location = <string> this.req.query.location;

    const { data, totalRows, nextPageToken, fields } = await getPageResult(null, null, null, null, jobId);
    return new QueryResultResponseObject(projectId, jobId, location, data, totalRows, nextPageToken, fields);
  }
}
