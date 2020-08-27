'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OperatorLogical',
  pattern: /AND|OR/i,
  longer_alt: Identifier
});
