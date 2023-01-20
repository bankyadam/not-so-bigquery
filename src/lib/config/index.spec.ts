import Config from './index';
import { expect } from 'chai';
import { QueryCacheParams } from './namespaces';

describe('Config', function() {
  describe('namespaces', function() {
    context('queryCache', function() {
      const configNamespace = Config.namespace('queryCache');
      it('has defaults', function() {
        expect(configNamespace.get(QueryCacheParams.CACHE_SCHEMA_NAME)).to.be.eql('fake_bigquery__query_cache');
        expect(configNamespace.get(QueryCacheParams.CACHE_CATALOG_TABLE_NAME)).to.be.eql('_catalog');
        expect(configNamespace.get(QueryCacheParams.CACHE_DEFAULT_EXPIRE)).to.be.eql('30 days');
      });
    });
  });
});
