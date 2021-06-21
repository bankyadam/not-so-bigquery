'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'IgnoreRespectNulls',
  pattern: /(IGNORE|RESPECT) NULLS/i
});
