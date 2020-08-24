'use strict';

module.exports = (init) => {
  const router = require('express-async-router').create({ mergeParams: true, strict: false });

  init.call(null, router);

  return router;
};
