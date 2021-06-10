'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'CurrentRow',
  pattern: /CURRENT ROW/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
