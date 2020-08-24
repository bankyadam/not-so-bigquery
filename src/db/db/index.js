'use strict';

const { Client } = require('pg');
const { POSTGRES_TYPES } = require('../bigQuery/types');

module.exports = class Db {
  constructor(connectionString) {
    this._db = new Client({ connectionString });
    this._db.connect();
  }

  async query(query, values) {
    return this._db.query(query, values);
  }

  async tableExists(schemaName, tableName) {
    const result = await this._db.query(`
        SELECT EXISTS(
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
        SELECT COLUMN_NAME AS field_name, IS_NULLABLE, DATA_TYPE
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = $1
          AND TABLE_NAME = $2
    `, [schemaName, tableName]);

    const fieldsData = result.rows;

    fieldsData.forEach(fieldData => {
      const field = {
        mode: fieldData.is_nullable ? 'NULLABLE' : '',
        name: fieldData.field_name,
        type: POSTGRES_TYPES[fieldData.data_type.toUpperCase()]
      };
      fields.push(field);
    });

    return fields;
  }
};
