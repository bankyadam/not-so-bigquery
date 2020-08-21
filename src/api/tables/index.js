module.exports = require('../../lib/router-factory')(function(router) {
  router.get('/', require('./list'));
  router.post('/', require('./insert'));

  router.get('/:tableId', require('./get'));
  router.delete('/:tableId', require('./delete'));
  router.get('/:tableId/data', require('./data'));
  router.post('/:tableId/insertAll', require('./insertAll'));

  // Not implemented
  router.patch('/:tableId', require('./patch'));
  router.put('/:tableId', require('./update'));
});
