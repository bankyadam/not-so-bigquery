'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'With',
  pattern: /WITH/i,
  longer_alt: Identifier
});
