'use strict';

const { Client } = require('pg');
const { POSTGRES_TYPES } = require('../bigQuery/types');
const RETRY_TIME = 1500;
const MAX_RETRY_COUNT = 5;
const DB_SYSTEM_STARTING_UP = '57P03';

module.exports = class Db {
  constructor(connectionString) {
    this._connectionString = connectionString;
    this._retryCount = 0;
    this._connect();
  }

  _connect() {
    this._db = new Client({ connectionString: this._connectionString });
    this._db.connect()
      .then(this._onConnectionSuccess.bind(this))
      .catch(this._onConnectionFail.bind(this));
  }

  _onConnectionSuccess() {
    this._retryCount = 0;
    console.info('Connection to DB was successful');
  }

  _onConnectionFail(e) {
    if (this._retryCount++ < MAX_RETRY_COUNT) {
      if (e.code === DB_SYSTEM_STARTING_UP) {
        this._retryCount--;
      }
      setTimeout(this._connect.bind(this), RETRY_TIME);
      return;
    }

    throw e;
  }

  async query(query, values) {
    return this._db.query(query, values);
  }

  async tableExists(schemaName, tableName) {
    const result = await this._db.query(`
        SELECT EXISTS (
            SELECT
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = $1
              AND TABLE_NAME = $2
        )
    `, [schemaName, tableName]);
    return result.rows.length > 0 && result.rows[0].exists;
  }

  async tableFields(schemaName, tableName) {
    const fields = [];

    const result = await this._db.query(`
        SELECT
            COLUMN_NAME AS field_name,
            CASE WHEN DATA_TYPE = 'ARRAY' THEN 'REPEATED' ELSE 'NULLABLE' END AS mode,
            udt_name AS DATA_TYPE
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = $1
          AND TABLE_NAME = $2
    `, [schemaName, tableName]);

    const fieldsData = result.rows;

    fieldsData.forEach(fieldData => {
      const normalizedFieldType = this._normalizeFieldType(fieldData.data_type);
      const fieldType = POSTGRES_TYPES[normalizedFieldType];
      if (!fieldType) {
        console.error('Unknown field data type', fieldData.data_type, normalizedFieldType);
      }
      const field = {
        mode: fieldData.mode,
        name: fieldData.field_name,
        type: fieldType
      };
      fields.push(field);
    });

    return fields;
  }

  _normalizeFieldType(fieldType) {
    return fieldType.replace(/^_+/, '').toUpperCase();
  }
};
