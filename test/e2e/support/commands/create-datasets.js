'use strict';

const runEverywhere = require('./run-everywhere');

module.exports = function(datasetId) {
  return runEverywhere(async conn => conn.dataset(datasetId).create());
};
