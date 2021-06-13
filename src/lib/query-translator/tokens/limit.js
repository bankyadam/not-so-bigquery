'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Limit',
  pattern: /LIMIT/i
});
