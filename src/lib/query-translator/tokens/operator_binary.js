'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OperatorBinary',
  pattern: /IS NOT|IS|AND|OR|<=|>=|<>|!=|<|=|>/i,
  longer_alt: Identifier
});
