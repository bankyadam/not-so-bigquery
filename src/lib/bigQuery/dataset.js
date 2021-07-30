'use strict';

const Table = require('./table');
const { map } = require('lodash');
const db = require('../db');

module.exports = class Dataset {
  constructor(project, datasetId) {
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
    const result = await db.query(`
        SELECT EXISTS(
                       SELECT
                       FROM information_schema.SCHEMATA
                       WHERE SCHEMA_NAME = $1
                   )
    `, [this.internalId]);

    return result.rows.length > 0 && result.rows[0].exists;
  }

  async create() {
    return await db.query(`CREATE SCHEMA IF NOT EXISTS ${this.internalId}`);
  }

  async delete(force) {
    return await db.query(`DROP SCHEMA IF EXISTS ${this.internalId} ${force ? 'CASCADE' : ''}`);
  }

  table(tableId) {
    return new Table(this, tableId);
  }

  async getTables() {
    const result = await db.query(
      'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = $1', [this.internalId]
    );

    return map(result.rows, 'table_name');
  }
};
