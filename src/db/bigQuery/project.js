const _ = require('lodash');
const Dataset = require('./dataset');

const RESERVED_SCHEMA_NAMES = [
  /^information_schema$/,
  /^public$/,
  /^pg_.+$/i
];

module.exports = class Project {
  constructor(db, projectId) {
    this._db = db;
    this._projectId = projectId;
  }

  get id() {
    return this._projectId;
  }

  get internalId() {
    return this.id.replace(/[^a-zA-Z0-9]/g, '_');
  }

  dataset(datasetId) {
    return new Dataset(this._db, this, datasetId);
  }

  async getDatasets() {
    const result = await this._db.query('SELECT SCHEMA_NAME FROM information_schema.SCHEMATA');

    const datasetNames = _.map(result.rows, (row) => {
      return row['schema_name'];
    });

    return _.chain(datasetNames)
      .reject(this._isDatasetInternal.bind(this))
      .filter(this._isInCurrentProject.bind(this))
      .value();
  }

  _isDatasetInternal(datasetId) {
    return RESERVED_SCHEMA_NAMES.findIndex(schemaPattern => schemaPattern.test(datasetId)) !== -1
  }

  _isInCurrentProject(datasetId) {
    return datasetId.indexOf(this.internalId) === 0;
  }
};
