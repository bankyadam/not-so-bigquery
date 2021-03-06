'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OperatorBinary',
  pattern: /IS NOT|IS|OR|<=|>=|<>|!=|<|=|>/i,
  longer_alt: Identifier
});
