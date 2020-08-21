const BaseEntityResponse = require('../baseEntityResponse');
const DatasetReference = require('./reference');

module.exports = class DatasetResponseObject extends BaseEntityResponse {
  constructor(projectId, datasetId) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
  }

  get TYPE() { return 'dataset' };

  get REFERENCE() {
    return new DatasetReference(this.projectId, this.datasetId);
  }

  compose() {
    return {
      id: this.REFERENCE.ID,
      datasetReference: this.REFERENCE,
      selfLink: '',
      labels: {},
      friendlyName: '',
      description: '',
      location: 'US',
      defaultTableExpirationMs: '',
      defaultPartitionExpirationMs: '',
      creationTime: '',
      lastModifiedTime: ''
    }
  }
}
