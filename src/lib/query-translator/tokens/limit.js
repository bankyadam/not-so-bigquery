'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Limit',
  pattern: /LIMIT/i,
  longer_alt: Identifier
});
