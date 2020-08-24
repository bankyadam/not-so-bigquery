'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.post('/', require('./insert').createHandler());

  // Not implemented
  router.get('/', require('./list').createHandler());
  router.get('/:jobId', require('./get').createHandler());
  router.post('/:jobId/cancel', require('./cancel').createHandler());
});
