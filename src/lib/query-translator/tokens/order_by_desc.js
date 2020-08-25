'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OrderByDesc',
  pattern: /DESC/i,
  longer_alt: Identifier
});
