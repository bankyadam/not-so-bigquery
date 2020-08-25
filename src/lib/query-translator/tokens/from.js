'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'From',
  pattern: /FROM/i,
  longer_alt: Identifier
});
