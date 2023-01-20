import { Client } from 'pg';
import { POSTGRES_TYPES } from '../../bigQuery/types';
import { Field } from '../types';

const MINUTES = 60000;
const RETRY_TIME = 1500;
const PING_TIME = 2 * MINUTES;
const MAX_RETRY_COUNT = 5;

const DB_CONNECTION_TERMINATED = '57P01';
const DB_SYSTEM_STARTING_UP = '57P03';

export default class Db {
  private readonly connectionString: string;
  private retryCount: number;
  private ping: ReturnType<typeof setInterval>;
  private dbClient: Client;

  constructor(connectionString) {
    this.connectionString = connectionString;
    this.retryCount = 0;
    this.ping = null;
    this.connect();
  }

  async query(query, values?) {
    return this.dbClient.query(query, values)
      .catch(this.onQueryError.bind(this));
  }

  async tableExists(schemaName, tableName): Promise<boolean> {
    const result = await this.dbClient.query(`
        SELECT EXISTS(
                       SELECT
                       FROM information_schema.TABLES
                       WHERE TABLE_SCHEMA = $1
                         AND TABLE_NAME = $2
                   )
    `, [schemaName, tableName]);
    return result.rows.length > 0 && result.rows[0].exists;
  }

  async tableFields(schemaName, tableName): Promise<Field[]> {
    const fields = [];

    const result = await this.dbClient.query(`
        SELECT COLUMN_NAME                                                       AS field_name,
               CASE WHEN DATA_TYPE = 'ARRAY' THEN 'REPEATED' ELSE 'NULLABLE' END AS mode,
               udt_name                                                          AS DATA_TYPE
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = $1
          AND TABLE_NAME = $2
    `, [schemaName, tableName]);

    result.rows.forEach(fieldData => {
      const normalizedFieldType = this.normalizeFieldType(fieldData.data_type);
      const fieldType = POSTGRES_TYPES[normalizedFieldType];
      if (!fieldType) {
        console.error('Unknown field data type', fieldData.data_type, normalizedFieldType);
      }
      const field: Field = {
        mode: fieldData.mode,
        name: fieldData.field_name,
        type: fieldType
      };
      fields.push(field);
    });

    return fields;
  }

  private reconnect() {
    this.endPing();
    this.retryCount = 0;
    this.connect();
  }

  private connect() {
    this.dbClient = new Client({ connectionString: this.connectionString });
    this.dbClient.connect()
      .then(this.onConnectionSuccess.bind(this))
      .catch(this.onConnectionFail.bind(this));
  }

  private onConnectionSuccess() {
    this.retryCount = 0;
    this.startPing();
    console.info('Connection to DB was successful');
    this.dbClient.on('error', this.onClientError.bind(this));
  }

  private onConnectionFail(e) {
    if (this.retryCount++ < MAX_RETRY_COUNT) {
      if (e.code === DB_SYSTEM_STARTING_UP) {
        this.retryCount--;
      }
      setTimeout(this.connect.bind(this), RETRY_TIME);
      return;
    }

    console.log('ERROR HAPPENED', e);
    throw e;
  }

  private onClientError(e) {
    console.log(e);
    if (e.code === DB_CONNECTION_TERMINATED) {
      this.reconnect();
      return;
    }

    throw e;
  }

  private startPing() {
    if (this.ping) {
      return;
    }

    this.ping = setInterval(() => {
      this.query('SELECT 1');
    }, PING_TIME);
  }

  private endPing() {
    if (!this.ping) {
      return;
    }
    clearInterval(this.ping);
    this.ping = null;
  }

  private onQueryError(error) {
    this.endPing();
    throw error;
  }

  private normalizeFieldType(fieldType) {
    return fieldType.replace(/^_+/, '').toUpperCase();
  }
}
