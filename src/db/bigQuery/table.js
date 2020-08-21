const { BIGQUERY_TYPES } = require('./types');
const {
  ENTITY_TYPES: METADATA_ENTITY_TYPES
} = require('./enums/metadata');
const { find, omit, get, keys, values } = require('lodash');

const pageResult = require('../pageResult');

module.exports = class Table {
  constructor(db, dataset, tableId) {
    this._db = db;
    this._dataset = dataset;
    this._tableId = tableId;
  }

  get id() {
    return this._tableId;
  }

  get internalId() {
    return this.id;
  }

  get _pgTableReference() {
    return `${this._dataset.internalId}.${this.internalId}`;
  }

  async exists() {
    return await this._db.tableExists(this._dataset.internalId, this.internalId);
  }

  async create(schema) {
    await this._createTable(schema);
    await this._addDescriptionToFields(schema);
    return true;
  }

  async _createTable(fields) {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS ${this._pgTableReference} (
        ${this._generateFields(fields)}
      )
    `;

    await this._db.query(createTableSql);
  }

  async _addDescriptionToFields(fields) {
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      if (field.description) {
        await this._removeDescriptionFromField(field.name);
        await this._addDescriptionToField(field.name, field.description);
      }
    }
  }

  async _removeDescriptionFromField(fieldName) {
    await this._db.query(`
        DELETE
        FROM fake_bigquery__metadata.metadata
        WHERE entity_id = $1
          AND entity_parent_path = $2
          AND entity_type = $3
    `, [fieldName, this._pgTableReference, METADATA_ENTITY_TYPES.COLUMN]);

  }

  async _addDescriptionToField(fieldName, description) {
    await this._db.query(`
        INSERT INTO fake_bigquery__metadata.metadata
            (entity_id, entity_parent_path, entity_type, value)
        VALUES ($1, $2, $3, $4)
    `, [fieldName, this._pgTableReference, METADATA_ENTITY_TYPES.COLUMN, description]);
  }

  _generateFields(fields) {
    return fields.map(field => {
      return `${field.name} ${BIGQUERY_TYPES[field.type.toUpperCase()]}`;
    }).join(',\n');
  }

  async delete() {
    await this._db.query(
      `DROP TABLE IF EXISTS ${this._dataset.internalId}.${this.internalId}`
    );
    await this._db.query(
        `DELETE
         FROM fake_bigquery__metadata.metadata
         WHERE entity_parent_path = $1
           AND entity_type = $2`,
      [this._pgTableReference, METADATA_ENTITY_TYPES.COLUMN]
    );
    await this._db.query(
        `DELETE
         FROM fake_bigquery__metadata.metadata
         WHERE entity_parent_path = $1
           AND entity_type = $2`,
      [this._dataset.internalId, METADATA_ENTITY_TYPES.TABLE]
    );
  }

  async fields() {
    const fields = await this._db.tableFields(this._dataset.internalId, this.internalId);

    const fieldDescriptions = await this._fieldDescriptions();

    return fields
      .map(field => {
        const description = get(find(fieldDescriptions, { field_name: field.name }), 'description');
        if (description) {
          field.description = description;
        }
        return field;
      });
  }

  async _fieldDescriptions() {
    const result = await this._db.query(`
        SELECT entity_id AS field_name,
               value     AS description
        FROM fake_bigquery__metadata.metadata
        WHERE entity_parent_path = $1
          AND entity_type = $2
    `, [this._pgTableReference, METADATA_ENTITY_TYPES.COLUMN]);

    return result.rows;
  }

  async insertRow(data) {
    const fieldNames = this._getFieldNames(data);
    const query = `
      INSERT INTO ${this._pgTableReference} (${fieldNames.join(', ')})
      VALUES (${this._getReferenceList(fieldNames.length).join(', ')})
    `;

    return await this._db.query(
      query,
      this._getFieldValuesInOrder(data, fieldNames)
    );
  }

  _getFieldNames(data) {
    return keys(data);
  }

  _getReferenceList(count) {
    const referenceList = [];
    for (let i = 0; i < count; i++) {
      referenceList.push(`\$${i + 1}`);
    }
    return referenceList;
  }

  _getFieldValuesInOrder(data, fieldNames) {
    return fieldNames.map(fieldName => data[fieldName]);
  }

  async getData(options) {
    const query = `SELECT * FROM ${this._pgTableReference}`;

    const { data, totalRows, nextPageToken } = await pageResult(this._db, query, null, options.maxResults, options.pageToken);

    return {
      data,
      totalRows,
      nextPageToken
    };
  }
};
