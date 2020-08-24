'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Limit',
  pattern: /LIMIT/,
  longer_alt: Identifier
});
