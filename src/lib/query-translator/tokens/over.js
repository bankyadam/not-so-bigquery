'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'Over',
  pattern: /OVER/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
