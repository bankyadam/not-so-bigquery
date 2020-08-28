'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'On',
  pattern: /ON/i,
  longer_alt: Identifier
});
