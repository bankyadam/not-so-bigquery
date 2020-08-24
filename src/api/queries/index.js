'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.get('/:jobId', require('./getQueryResult'));

  // Not implemented
  router.post('/', require('./query'));
});
