import BaseError from '../../baseError';
import TableReference from '../reference';

export default class TableNotFoundError extends BaseError {
  private tableReference: TableReference;
  constructor(projectId, datasetId, tableId) {
    super();
    this.tableReference = new TableReference(projectId, datasetId, tableId);
  }

  _errorCode = 404;
  _status = 'NOT_FOUND';
  _reason = 'notFound';
  get message() {
    return `Not found: Table ${this.tableReference.ID}`;
  }
}
