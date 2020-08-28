'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Numeric',
  // eslint-disable-next-line security/detect-unsafe-regex
  pattern: /[-+]?(\d+(\.\d*)?|\.\d+)(e[-+]?\d+)?/i
});
