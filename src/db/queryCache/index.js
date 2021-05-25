'use strict';

const crypto = require('crypto');

const CACHE_SCHEMA_NAME = 'fake_bigquery__query_cache';
const CACHE_CATALOG_TABLE_NAME = 'catalog';
const CACHE_EXPIRE = '30 days';

class QueryCacheNotExists extends Error {
  constructor(queryId) {
    super(`Query cache not exists: ${queryId}`);
  }
}

module.exports = class QueryCache {
  constructor(db, expire) {
    this._db = db;
    this._runned = false;
    this._queryId = null;
    this._query = null;
    this._expire = expire || CACHE_EXPIRE;
  }

  get queryId() {
    return this._queryId;
  }

  async run(query, data, queryId) {
    this._query = query;
    this._queryData = data || [];
    this._queryId = this._consolidateQueryId(queryId || this._generateQueryId());

    if (!(await this._isCacheExists())) {
      console.log('Cache not exists', this._queryId);
      await this._createCacheTableByQuery();
    }

    this._runned = true;
  }

  async setQueryId(queryId) {
    this._queryId = this._consolidateQueryId(queryId);

    if (!(await this._isCacheExists())) {
      throw new QueryCacheNotExists(this._queryId);
    }

    this._runned = true;
  }

  _consolidateQueryId(queryId) {
    return queryId.replace(/[^a-zA-Z0-9_]/g, '');
  }

  async getPage(limit, offset) {
    if (!this._runned) {
      throw new Error('Should run query before trying to get a page');
    }

    const result = await this._db.query(`
        SELECT * FROM ${this._pgCacheTablePath}
        LIMIT ${limit}
        OFFSET ${offset}
    `);
    return result.rows;
  }

  async getTotalRows() {
    return (await this._db.query(`SELECT COUNT(1) FROM ${this._pgCacheTablePath}`)).rows[0].count;
  }

  async getCacheTableFields() {
    return await this._db.tableFields(CACHE_SCHEMA_NAME, this._cacheTableName);
  }

  get _cacheTableName() {
    return `cache_${this._queryId}`;
  }

  get _pgCacheTablePath() {
    return `${CACHE_SCHEMA_NAME}.${this._cacheTableName}`;
  }

  _generateQueryId() {
    const stringToHash = JSON.stringify({
      query: this._query,
      data: this._queryData
    });
    const hash = crypto.createHash('sha1');
    hash.update(stringToHash);
    return hash.digest('hex');
  }

  async _isCacheExists() {
    const hasCatalogEntry = await this._hasCatalogEntry();
    const cacheTableExists = await this._db.tableExists(CACHE_SCHEMA_NAME, this._cacheTableName);
    return hasCatalogEntry && cacheTableExists;
  }

  async _hasCatalogEntry() {
    const result = await this._db.query(`
        SELECT COUNT(1)
        FROM
            ${CACHE_SCHEMA_NAME}.${CACHE_CATALOG_TABLE_NAME}
        WHERE
              query_id = $1 AND
              created_at + INTERVAL '${this._expire}' > CURRENT_TIMESTAMP
    `, [this._queryId]);

    return result.rowCount === 1;
  }

  async _createCacheTableByQuery() {
    console.log('Dropping table…', this._queryId);
    await this._db.query(`DROP TABLE IF EXISTS ${this._pgCacheTablePath}`);
    console.log('Creating table by query result…', this._queryId);
    await this._db.query(`CREATE TABLE ${this._pgCacheTablePath} AS ${this._query}`, this._queryData);
    console.log('Registering cache table…', this._queryId);
    await this._db.query(`
        INSERT INTO
            ${CACHE_SCHEMA_NAME}.${CACHE_CATALOG_TABLE_NAME}
            (query_id, created_at)
        VALUES
            ($1, CURRENT_TIMESTAMP)
        ON CONFLICT (query_id)
            DO UPDATE SET
                created_at = EXCLUDED.created_at
    `, [this._queryId]);
  }
};
