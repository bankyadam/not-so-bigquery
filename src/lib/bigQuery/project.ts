import { chain, map } from 'lodash';
import Dataset from './dataset';
import db from '../db';

const RESERVED_SCHEMA_NAMES = [
  /^information_schema$/,
  /^public$/,
  /^pg_.+$/i
];

export default class Project {
  private readonly projectId: string;

  constructor(projectId) {
    this.projectId = projectId;
  }

  get id() {
    return this.projectId;
  }

  get internalId() {
    return this.id.replace(/[^a-zA-Z0-9]/g, '_');
  }

  dataset(datasetId) {
    return new Dataset(this, datasetId);
  }

  async getDatasets(): Promise<Array<string>> {
    const result = await db.query('SELECT SCHEMA_NAME FROM information_schema.SCHEMATA');

    const datasetNames = map(result.rows, 'schema_name');

    return chain(datasetNames)
      .reject(this.isDatasetInternal.bind(this))
      .filter(this.isInCurrentProject.bind(this))
      .value();
  }

  private isDatasetInternal(datasetId) {
    return RESERVED_SCHEMA_NAMES.findIndex(schemaPattern => schemaPattern.test(datasetId)) !== -1;
  }

  private isInCurrentProject(datasetId) {
    return datasetId.indexOf(this.internalId) === 0;
  }
}
