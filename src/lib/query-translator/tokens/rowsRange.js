'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'RowsRange',
  pattern: /ROWS|RANGE/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
