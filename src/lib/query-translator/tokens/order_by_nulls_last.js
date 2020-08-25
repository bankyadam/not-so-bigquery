'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'OrderByNullsLast',
  pattern: /NULLS LAST/i
});
