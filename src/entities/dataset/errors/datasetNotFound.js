'use strict';

const BaseError = require('../../baseError');
const DatasetReference = require('../reference');

module.exports = class DatasetNotFoundError extends BaseError {
  constructor(projectId, datasetId) {
    super();
    this.datasetReference = new DatasetReference(projectId, datasetId);
  }

  get errorCode() {
    return 404;
  }

  get status() {
    return 'NOT_FOUND';
  }

  get reason() {
    return 'notFound';
  }

  get message() {
    return `Not found: Dataset ${this.datasetReference.ID}`;
  }
};
