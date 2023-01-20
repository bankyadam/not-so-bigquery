import BaseError from '../../baseError';
import DatasetReference from '../reference';

export default class DatasetNotFoundError extends BaseError {
  private readonly datasetReference;

  constructor(projectId, datasetId) {
    super();
    this.datasetReference = new DatasetReference(projectId, datasetId);
  }

  _errorCode = 404;
  _status = 'NOT_FOUND';
  _reason = 'notFound';

  get message() {
    return `Not found: Dataset ${this.datasetReference.ID}`;
  }
}
