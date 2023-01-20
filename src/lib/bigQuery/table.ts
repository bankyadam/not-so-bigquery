import { BIGQUERY_TYPES, METADATA_ENTITY_TYPES } from './types';
import { find, get, keys } from 'lodash';

import db, { getPageResult, PageResult } from '../db';

export default class Table {
  private readonly dataset;
  private readonly tableId: string;

  constructor(dataset, tableId) {
    this.dataset = dataset;
    this.tableId = tableId;
  }

  get id() {
    return this.tableId;
  }

  get internalId() {
    return this.id;
  }

  private get pgTableReference() {
    return `${this.dataset.internalId}.${this.internalId}`;
  }

  async exists() {
    return await db.tableExists(this.dataset.internalId, this.internalId);
  }

  async create(schema) {
    await this.createTable(schema);
    await this.addDescriptionToFields(schema);
    return true;
  }

  async delete() {
    await db.query(
      `DROP TABLE IF EXISTS ${this.dataset.internalId}.${this.internalId}`
    );
    await db.query(
      `DELETE
       FROM fake_bigquery__metadata.metadata
       WHERE entity_parent_path = $1
         AND entity_type = $2`,
      [this.pgTableReference, METADATA_ENTITY_TYPES.COLUMN]
    );
    await db.query(
      `DELETE
       FROM fake_bigquery__metadata.metadata
       WHERE entity_parent_path = $1
         AND entity_type = $2`,
      [this.dataset.internalId, METADATA_ENTITY_TYPES.TABLE]
    );
  }

  async fields() {
    const fields = await db.tableFields(this.dataset.internalId, this.internalId);

    const fieldDescriptions = await this.fieldDescriptions();

    return fields
      .map(field => {
        const description = get(find(fieldDescriptions, { field_name: field.name }), 'description');
        if (description) {
          field.description = description;
        }
        return field;
      });
  }

  async insertRow(data) {
    const fieldNames = this.getFieldNames(data);
    const query = `
        INSERT INTO ${this.pgTableReference} (${fieldNames.join(', ')})
        VALUES (${this.getReferenceList(fieldNames.length).join(', ')})
    `;

    return await db.query(
      query,
      this.getFieldValuesInOrder(data, fieldNames)
    );
  }

  async getData(
    options: { maxResults: number, pageToken?: string } = { maxResults: 0, pageToken: null }
  ): Promise<PageResult> {
    const query = `SELECT *
                   FROM ${this.pgTableReference}`;

    return await getPageResult(
      query, null, options.maxResults, options.pageToken
    );
  }

  private async createTable(fields) {
    const generatedFields = this.generateFields(fields);
    const createTableSql = `CREATE TABLE IF NOT EXISTS ${this.pgTableReference}
        ( ${generatedFields})`;

    await db.query(createTableSql);
  }

  private async addDescriptionToFields(fields) {
    for (let index = 0; index < fields.length; index++) {
      const field = fields[index];
      if (field.description) {
        await this.removeDescriptionFromField(field.name);
        await this.addDescriptionToField(field.name, field.description);
      }
    }
  }

  private async removeDescriptionFromField(fieldName) {
    await db.query(`
        DELETE
        FROM fake_bigquery__metadata.metadata
        WHERE entity_id = $1
          AND entity_parent_path = $2
          AND entity_type = $3
    `, [fieldName, this.pgTableReference, METADATA_ENTITY_TYPES.COLUMN]);

  }

  private async addDescriptionToField(fieldName, description) {
    await db.query(`
        INSERT INTO fake_bigquery__metadata.metadata
            (entity_id, entity_parent_path, entity_type, value)
        VALUES ($1, $2, $3, $4)
    `, [fieldName, this.pgTableReference, METADATA_ENTITY_TYPES.COLUMN, description]);
  }

  private generateFields(fields) {
    return fields
      .map(field => {
        return `${field.name} ${BIGQUERY_TYPES[field.type.toUpperCase()]}`;
      })
      .join(',\n');
  }

  private async fieldDescriptions() {
    const result = await db.query(`
        SELECT entity_id AS field_name,
               value     AS description
        FROM fake_bigquery__metadata.metadata
        WHERE entity_parent_path = $1
          AND entity_type = $2
    `, [this.pgTableReference, METADATA_ENTITY_TYPES.COLUMN]);

    return result.rows;
  }

  private getFieldNames(data) {
    return keys(data);
  }

  private getReferenceList(count) {
    const referenceList = [];
    for (let i = 0; i < count; i++) {
      referenceList.push(`$${i + 1}`);
    }
    return referenceList;
  }

  private getFieldValuesInOrder(data, fieldNames) {
    return fieldNames.map(fieldName => data[fieldName]);
  }
}
