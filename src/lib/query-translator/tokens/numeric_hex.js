'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'NumericHex',
  pattern: /0x[a-fA-F0-9]+/
});
