import BaseError from '../../baseError';
import TableReference from '../reference';

export default class TableNotFoundError extends BaseError {
  private tableReference: TableReference;

  constructor(projectId, datasetId, tableId) {
    super();
    this.tableReference = new TableReference(projectId, datasetId, tableId);
  }

  _errorCode = 409;
  _status = 'ALREADY_EXISTS';
  _reason = 'duplicate';

  get message() {
    return `Already Exists: Table ${this.tableReference.ID}`;
  }
}
