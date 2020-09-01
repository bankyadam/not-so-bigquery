'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Offset',
  pattern: /OFFSET (0|[1-9]\d*)/i
});
