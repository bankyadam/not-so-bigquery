'use strict';

module.exports = class QueryCacheNotExists extends Error {
  constructor(queryId) {
    super(`Query cache not exists: ${queryId}`);
  }
};
