module.exports = require('../../lib/router-factory')(function(router) {
  router.use('/:datasetId/tables', require('../tables'));

  router.get('/', require('./list'));
  router.post('/', require('./insert'));
  router.get('/:datasetId', require('./get'));
  router.delete('/:datasetId', require('./delete'));

  // Not implemented
  router.patch('/:datasetId', require('./patch'));
  router.put('/:datasetId', require('./update'));
});
