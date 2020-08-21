const TableDataListResponseObject = require('../tableDataList/response');
const JobReference = require('../job/reference');

module.exports = class JobResponseObject extends TableDataListResponseObject {
  constructor(projectId, jobId, location, data, totalRows, pageToken, fields) {
    super(data, totalRows, pageToken);
    this.projectId = projectId;
    this.jobId = jobId;
    this.location = location;
    this.fields = fields;
  }

  get TYPE() { return 'getQueryResultsResponse' };

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
