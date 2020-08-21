const BaseError = require('../../baseError');
const TableReference = require('../reference');

module.exports = class TableNotFoundError extends BaseError {
  constructor(projectId, datasetId, tableId) {
    super();
    this.tableReference = new TableReference(projectId, datasetId, tableId);
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
    return `Not found: Table ${this.tableReference.ID}`;
  }
};
