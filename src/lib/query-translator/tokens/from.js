'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'From',
  pattern: /FROM/,
  longer_alt: Identifier
});
