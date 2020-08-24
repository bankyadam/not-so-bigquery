'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.get('/', require('./list').createHandler());
  router.post('/', require('./insert').createHandler());

  router.get('/:tableId', require('./get').createHandler());
  router.delete('/:tableId', require('./delete').createHandler());
  router.get('/:tableId/data', require('./data').createHandler());
  router.post('/:tableId/insertAll', require('./insertAll').createHandler());

  // Not implemented
  router.patch('/:tableId', require('./patch').createHandler());
  router.put('/:tableId', require('./update').createHandler());
});
