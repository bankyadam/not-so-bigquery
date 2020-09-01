'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'On',
  pattern: /ON/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
