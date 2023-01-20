import crypto from 'crypto';
import db from '../index';
import QueryCacheNotExists from './errors/queryCacheNotExists';
import { Field } from '../types';
import { pick } from 'lodash';
import Config from '../../config';

const CACHE_SCHEMA_NAME = Config.namespace('queryCache').get('CACHE_SCHEMA_NAME');
const CACHE_CATALOG_TABLE_NAME = Config.namespace('queryCache').get('CACHE_CATALOG_TABLE_NAME');

export default class QueryCache {
  private done: boolean;
  private query: string;
  private expire: string;
  private _queryData: unknown[];
  private _queryId: string;

  constructor(expire = <string>Config.namespace('queryCache').get('CACHE_DEFAULT_EXPIRE')) {
    this.done = false;
    this._queryId = null;
    this.query = null;
    this.expire = expire;
  }

  get queryId(): string {
    return this._queryId;
  }

  async run(query: string, data: [] = [], queryId: string) {
    this.query = query;
    this._queryData = data;

    try {
      await this.setQueryId(queryId || this.generateQueryId());
      return;
    } catch (e) {
      if (!(e instanceof QueryCacheNotExists)) {
        throw e;
      }
    }

    console.info('Cache not exists', this._queryId);
    await this.createCacheTableByQuery();
    this.done = true;
  }

  async setQueryId(queryId): Promise<void>|never {
    this._queryId = this.consolidateQueryId(queryId);

    if (await this.isCacheExists()) {
      this.done = true;
      return;
    }

    throw new QueryCacheNotExists(this._queryId);
  }

  async getPage(limit: number, offset = 0): Promise<object[]>|never {
    if (!this.done) {
      throw new Error('Should run query before trying to get a page');
    }

    const result = await db.query(`
        SELECT * FROM ${this.pgCacheTablePath()}
        LIMIT ${limit}
        OFFSET ${offset}
    `);
    return result.rows;
  }

  async getTotalRows(): Promise<number> {
    const result = await db.query(`SELECT COUNT(1) FROM ${this.pgCacheTablePath()}`);
    return parseInt(result.rows[0].count, 10);
  }

  async getCacheTableFields(): Promise<Field[]> {
    return db.tableFields(CACHE_SCHEMA_NAME, this.cacheTableName());
  }

  private consolidateQueryId(queryId): string {
    return queryId.replace(/[^a-zA-Z0-9_]/g, '');
  }

  private cacheTableName(): string {
    return `cache_${this._queryId}`;
  }

  private pgCacheTablePath(): string {
    return `${CACHE_SCHEMA_NAME}.${this.cacheTableName()}`;
  }

  private generateQueryId(): string {
    const stringToHash = JSON.stringify({
      query: this.query,
      data: this._queryData
    });
    const hash = crypto.createHash('sha1');
    hash.update(stringToHash);
    return hash.digest('hex');
  }

  private async isCacheExists(): Promise<boolean> {
    const hasCatalogEntry = await this.hasCatalogEntry();
    const cacheTableExists = await db.tableExists(CACHE_SCHEMA_NAME, this.cacheTableName());
    return hasCatalogEntry && cacheTableExists;
  }

  private async hasCatalogEntry(): Promise<boolean> {
    const result = await db.query(`
        SELECT COUNT(1)
        FROM
            ${CACHE_SCHEMA_NAME}.${CACHE_CATALOG_TABLE_NAME}
        WHERE
              query_id = $1 AND
              expire_at > CURRENT_TIMESTAMP
    `, [this._queryId]);

    return result.rowCount === 1;
  }

  private async createCacheTableByQuery(): Promise<void> {
    console.info('Dropping table…', this._queryId);
    await this.dropCacheTable();
    console.info('Creating table by query result…', this._queryId);
    await this.createCacheTable();
    console.info('Registering cache table…', this._queryId);
    await this.registerCache();
  }

  private async dropCacheTable(): Promise<void> {
    await db.query(`DROP TABLE IF EXISTS ${this.pgCacheTablePath()}`);
  }

  private async createCacheTable(): Promise<void> {
    await db.query(`CREATE TABLE ${this.pgCacheTablePath()} AS ${this.query}`, this._queryData);
  }

  private async registerCache(): Promise<void> {
    await db.query(`
        INSERT INTO
            ${CACHE_SCHEMA_NAME}.${CACHE_CATALOG_TABLE_NAME}
            (query_id, created_at, expire_at)
        VALUES
            ($1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '${this.expire}')
        ON CONFLICT (query_id)
            DO UPDATE SET
                created_at = EXCLUDED.created_at,
                expire_at = EXCLUDED.created_at + INTERVAL '${this.expire}'
    `, [this._queryId]);
  }

  static async cleanup() {
    const expiredCacheIds = pick((await db.query(`
        SELECT
            query_id
        FROM
            ${CACHE_SCHEMA_NAME}.${CACHE_CATALOG_TABLE_NAME}
        WHERE
            expire_at < CURRENT_TIMESTAMP
    `)).rows, 'query_id');
    console.log(expiredCacheIds);
  }
}
