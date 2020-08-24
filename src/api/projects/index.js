'use strict';

module.exports = require('../../lib/router-factory')(function(router) {
  router.use('/:projectId/datasets', require('../datasets'));
  router.use('/:projectId/jobs', require('../jobs'));
  router.use('/:projectId/queries', require('../queries'));

  // Not implemented
  router.get('/', require('./list'));
  router.get('/:projectId/serviceAccount', require('./getServiceAccount'));
});
