'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Using',
  pattern: /USING/i,
  longer_alt: Identifier
});
