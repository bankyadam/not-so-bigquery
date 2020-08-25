'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'With',
  pattern: /WITH/,
  longer_alt: Identifier
});
