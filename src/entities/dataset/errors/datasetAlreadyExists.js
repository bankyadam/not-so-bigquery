const BaseError = require('../../baseError');
const DatasetReference = require('../reference');

module.exports = class DatasetNotFoundError extends BaseError {
  constructor(projectId, datasetId) {
    super();
    this.datasetReference = new DatasetReference(projectId, datasetId);
  }

  get errorCode() {
    return 409;
  }

  get status() {
    return 'ALREADY_EXISTS';
  }

  get reason() {
    return 'duplicate';
  }

  get message() {
    return `Already Exists: Dataset ${this.datasetReference.ID}`;
  }
};
