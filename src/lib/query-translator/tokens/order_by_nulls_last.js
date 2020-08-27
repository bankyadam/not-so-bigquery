'use strict';

const { createToken } = require('chevrotain');
const LiteralConstant = require('./literal_constant');

module.exports = createToken({
  name: 'OrderByNullsLast',
  pattern: /NULLS LAST/i,
  longer_alt: LiteralConstant
});
