'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Limit',
  pattern: /LIMIT (0|[1-9]\d*)/i
});
