'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OperatorComparison',
  pattern: /<=|>=|<>|!=|<|=|>/,
  longer_alt: Identifier
});
