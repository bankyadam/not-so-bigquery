import TableDataListResponse from '../tableDataList/response';
import JobReference from '../job/reference';
import { ResponseField } from '../types';

export default class JobResponseObject extends TableDataListResponse {
  TYPE = 'getQueryResultsResponse';

  private readonly projectId: string;
  private readonly jobId: string;
  private readonly location: string;

  constructor(projectId, jobId, location = 'EU',
    data = [], totalRows = 0, pageToken = '', fields: ResponseField[] = []
  ) {
    super(data, totalRows, pageToken, fields);
    this.projectId = projectId;
    this.jobId = jobId;
    this.location = location;
    this.fields = fields;
  }


  get REFERENCE() {
    return new JobReference(this.projectId, this.jobId, this.location);
  }

  compose() {
    return Object.assign(super.compose(), {
      schema: { fields: this.fields },
      jobReference: this.REFERENCE,
      totalBytesProcessed: 0,
      jobComplete: true,
      errors: [],
      cacheHit: true
    });
  }
}
