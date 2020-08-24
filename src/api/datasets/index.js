'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.use('/:datasetId/tables', require('../tables'));

  router.get('/', require('./list').createHandler());
  router.post('/', require('./insert').createHandler());
  router.get('/:datasetId', require('./get').createHandler());
  router.delete('/:datasetId', require('./delete').createHandler());

  // Not implemented
  router.patch('/:datasetId', require('./patch').createHandler());
  router.put('/:datasetId', require('./update').createHandler());
});
