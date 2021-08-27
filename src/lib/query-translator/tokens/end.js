'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'End',
  pattern: /END/i,
  longer_alt: Identifier,
  categories: [AnyWord]
});
