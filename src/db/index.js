'use strict';

const Db = require('./db');
const Project = require('./bigQuery/project');
const QueryCache = require('./queryCache');
const _pageResult = require('./pageResult');

const dbConnection = new Db(process.env.DB);

module.exports.BigQueryProject = Project;
module.exports.BigQueryProject.create = (projectId) => {
  return new Project(dbConnection, projectId);
};
module.exports.dbConnection = dbConnection;
module.exports.QueryCache = QueryCache;
module.exports.QueryCache.create = (expire) => {
  return new QueryCache(dbConnection, expire);
};
module.exports.pageResult = async function(query, queryData, maxResults, pageToken, queryId) {
  return await _pageResult(dbConnection, query, queryData, maxResults, pageToken, queryId);
};
