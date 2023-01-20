import BaseEntityResponse from '../baseEntityResponse';
import DatasetReference from './reference';

export default class DatasetResponse extends BaseEntityResponse {
  TYPE = 'dataset';

  private readonly projectId: string;
  private readonly datasetId: string;

  constructor(projectId, datasetId) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
  }

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
    };
  }
}
