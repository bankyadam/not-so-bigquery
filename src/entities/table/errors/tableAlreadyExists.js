'use strict';

const BaseError = require('../../baseError');
const TableReference = require('../reference');

module.exports = class TableNotFoundError extends BaseError {
  constructor(projectId, datasetId, tableId) {
    super();
    this.tableReference = new TableReference(projectId, datasetId, tableId);
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
    return `Already Exists: Table ${this.tableReference.ID}`;
  }
};
