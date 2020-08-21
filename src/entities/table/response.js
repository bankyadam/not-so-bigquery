const BaseEntityResponse = require('../baseEntityResponse');
const TableReference = require('./reference');

module.exports = class TableResponseObject extends BaseEntityResponse {
  constructor(projectId, datasetId, tableId, fields) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableId = tableId;
    this.fields = fields;
  }

  get TYPE() {
    return 'table';
  };

  get REFERENCE() {
    return new TableReference(this.projectId, this.datasetId, this.tableId);
  }

  compose() {
    return {
      id: this.REFERENCE.ID,
      tableReference: this.REFERENCE,
      selfLink: `https://bigquery.googleapis.com/bigquery/v2/projects/${this.projectId}/datasets/${this.datasetId}/tables/${this.tableId}`,
      labels: {},
      friendlyName: '',
      description: '',
      location: 'EU',
      type: 'TABLE',
      schema: { fields: this.fields },
      numBytes: '',
      numLongTermBytes: '',
      numRows: '',
      creationTime: '',
      expirationTime: '',
      lastModifiedTime: ''
    };
  }
};
