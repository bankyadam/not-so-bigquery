'use strict';

const runEverywhere = require('./run-everywhere');

module.exports = async function(datasetId) {
  return runEverywhere(async (conn, args) => {
    try {
      return await conn.dataset(args[0]).delete({ force: true });
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
  }, datasetId);
};
