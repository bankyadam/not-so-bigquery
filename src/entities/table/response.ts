import BaseEntityResponse from '../baseEntityResponse';
import TableReference from './reference';
import { Field } from '../../lib/db';

export default class TableResponseObject extends BaseEntityResponse {
  TYPE = 'table';

  private readonly projectId: string;
  private readonly datasetId: string;
  private readonly tableId: string;
  private readonly fields: object[];

  constructor(projectId, datasetId, tableId, fields: Field[] = []) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableId = tableId;
    this.fields = fields;
  }

  get REFERENCE() {
    return new TableReference(this.projectId, this.datasetId, this.tableId);
  }

  compose() {
    return {
      id: this.REFERENCE.ID,
      tableReference: this.REFERENCE,
      // eslint-disable-next-line max-len
      selfLink: `https://bigquery.googleapis.com/bigquery/v2/projects/${this.projectId}/datasets/${this.datasetId}/tables/${this.tableId}`,
      labels: {},
      friendlyName: '',
      description: '',
      location: 'EU',
      type: 'TABLE',
      schema: { fields: this.fields },
      numBytes: '',
      numLongTermBytes: '',
      numRows: '',
      creationTime: '',
      expirationTime: '',
      lastModifiedTime: ''
    };
  }
}
