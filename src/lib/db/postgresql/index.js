'use strict';

const MINUTES = 60000;

const { Client } = require('pg');
const { POSTGRES_TYPES } = require('../../bigQuery/types');
const RETRY_TIME = 1500;
const PING_TIME = 1 * MINUTES;
const MAX_RETRY_COUNT = 5;

const DB_CONNECTION_TERMINATED = '57P01';
const DB_SYSTEM_STARTING_UP = '57P03';

module.exports = class Db {
  constructor(connectionString) {
    this._connectionString = connectionString;
    this._retryCount = 0;
    this._ping = null;
    this._connect();
  }

  _reconnect() {
    this._endPing();
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
    this._startPing();
    console.info('Connection to DB was successful');
    this._db.on('error', this._onClientError.bind(this));
  }

  _onConnectionFail(e) {
    if (this._retryCount++ < MAX_RETRY_COUNT) {
      if (e.code === DB_SYSTEM_STARTING_UP) {
        this._retryCount--;
      }
      setTimeout(this._connect.bind(this), RETRY_TIME);
      return;
    }

    console.log('ERROR HAPPENED', e);
    throw e;
  }

  _onClientError(e) {
    console.log(e);
    if (e.code === DB_CONNECTION_TERMINATED) {
      this._reconnect();
      return;
    }

    throw e;
  }

  _startPing() {
    if (this._ping) { return; }

    this._ping = setInterval(() => {
      this.query('SELECT 1');
    }, PING_TIME);
  }

  _endPing() {
    if (!this._ping) { return; }
    clearInterval(this._ping);
    this._ping = null;
  }

  async query(query, values) {
    return this._db.query(query, values)
      .catch(this._onQueryError.bind(this));
  }

  _onQueryError(error) {
    console.dir(error);
    this._endPing();
    throw error;
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
