'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'With',
  pattern: /WITH/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
