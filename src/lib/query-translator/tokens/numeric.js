'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Numeric',
  pattern: /[-+]?(\d+(\.\d*)?|\.\d+)(e[-+]?\d+)?/i
});
