'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.get('/:jobId', require('./getQueryResult').createHandler());

  // Not implemented
  router.post('/', require('./query').createHandler());
});
