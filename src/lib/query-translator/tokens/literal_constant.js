'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'LiteralConstant',
  pattern: /NULL|TRUE|FALSE|CURRENT_TIMESTAMP|CURRENT_DATE|CURRENT_TIME/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
