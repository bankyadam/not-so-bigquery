'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'And',
  pattern: /AND/i,
  longer_alt: Identifier
});
