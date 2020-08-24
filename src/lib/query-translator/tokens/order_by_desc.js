'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'OrderByDesc',
  pattern: /DESC/
});
