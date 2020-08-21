module.exports = require('../lib/router-factory')(function(router) {
  router.use('/projects', require('./projects'));
});
