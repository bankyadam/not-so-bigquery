'use strict';

const QueryCache = require('../queryCache');
const zlib = require('zlib');

module.exports = async function(db, query, queryData, maxResults, pageToken, queryId) {
  const cache = new QueryCache(db);
  maxResults = maxResults < 1 ? 100000 : Math.min(maxResults, 100000);

  let page = 0;
  if (!pageToken) {
    await cache.run(query, queryData, queryId);
  } else {
    const tokenData = zlib.gunzipSync(Buffer.from(pageToken, 'base64'));
    const { queryId, nextPage } = JSON.parse(tokenData.toString());
    page = nextPage;
    await cache.setQueryId(queryId);
  }

  const offset = page * maxResults;
  const data = await cache.getPage(maxResults, offset);
  const totalRows = parseInt(await cache.getTotalRows(), 10);

  let nextPageToken = null;
  if (offset + maxResults < totalRows) {
    const tokenData = {
      queryId: cache.queryId,
      nextPage: page + 1
    };
    const gzipToken = zlib.gzipSync(Buffer.from(JSON.stringify(tokenData)));
    nextPageToken = Buffer.from(gzipToken).toString('base64');
  }

  return {
    data,
    totalRows,
    nextPageToken,
    fields: await cache.getCacheTableFields()
  };
};
