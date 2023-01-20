import { Config } from '../config';

export enum QueryCacheParams {
  CACHE_SCHEMA_NAME = 'CACHE_SCHEMA_NAME',
  CACHE_CATALOG_TABLE_NAME = 'CACHE_CATALOG_TABLE_NAME',
  CACHE_DEFAULT_EXPIRE = 'CACHE_DEFAULT_EXPIRE'
}

export class QueryCacheConfig extends Config {
  namespace = 'queryCache';

  constructor() {
    super();
    this.init();
  }

  protected setDefaults(): void {
    this.values.set(QueryCacheParams.CACHE_SCHEMA_NAME, 'fake_bigquery__query_cache');
    this.values.set(QueryCacheParams.CACHE_CATALOG_TABLE_NAME, '_catalog');
    this.values.set(QueryCacheParams.CACHE_DEFAULT_EXPIRE, '30 days');
  }
}
