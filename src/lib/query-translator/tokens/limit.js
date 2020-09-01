'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'Limit',
  pattern: /LIMIT (0|[1-9]\d*)/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
