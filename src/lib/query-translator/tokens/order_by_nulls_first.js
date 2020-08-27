'use strict';

const { createToken } = require('chevrotain');
const LiteralConstant = require('./literal_constant');

module.exports = createToken({
  name: 'OrderByNullsFirst',
  pattern: /NULLS FIRST/i,
  longer_alt: LiteralConstant
});
