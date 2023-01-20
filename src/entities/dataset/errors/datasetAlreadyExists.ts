import BaseError from '../../baseError';
import DatasetReference from '../reference';

class DatasetAlreadyExistsError extends BaseError {
  private datasetReference;

  constructor(projectId, datasetId) {
    super();
    this.datasetReference = new DatasetReference(projectId, datasetId);
  }

  _errorCode = 409;
  _status = 'ALREADY_EXISTS';
  _reason = 'duplicate';

  get message() {
    return `Already Exists: Dataset ${this.datasetReference.ID}`;
  }
}

export default DatasetAlreadyExistsError;
