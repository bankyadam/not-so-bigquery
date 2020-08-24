'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.post('/', require('./insert'));

  // Not implemented
  router.get('/', require('./list'));
  router.get('/:jobId', require('./get'));
  router.post('/:jobId/cancel', require('./cancel'));
});
