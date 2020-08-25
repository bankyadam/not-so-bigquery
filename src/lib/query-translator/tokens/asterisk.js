'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Asterisk',
  pattern: /\*/,
  longer_alt: Identifier
});
