const Table = require('./table');
const { map } = require('lodash');

module.exports = class Dataset {
  constructor(db, project, datasetId) {
    this._db = db;
    this._project = project;
    this._datasetId = datasetId;
  }

  get id() {
    return this._datasetId;
  }

  get internalId() {
    return this._project.internalId + '__' + this.id;
  }

  async exists() {
    const result = await this._db.query(`
        SELECT EXISTS(
                       SELECT
                       FROM information_schema.SCHEMATA
                       WHERE SCHEMA_NAME = $1
                   )
    `, [this.internalId]);

    return result.rows.length > 0 && result.rows[0].exists;
  }

  async create() {
    return await this._db.query(`CREATE SCHEMA IF NOT EXISTS ${this.internalId}`);
  }

  async delete(force) {
    return await this._db.query(`DROP SCHEMA IF EXISTS ${this.internalId} ${force ? 'CASCADE' : ''}`);
  }

  table(tableId) {
    return new Table(this._db, this, tableId);
  }

  async getTables() {
    const result = await this._db.query(
      'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = $1', [this.internalId]
    );

    return map(result.rows, (row) => {
      return row['table_name'];
    });
  }
};
