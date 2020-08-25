'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Where',
  pattern: /WHERE/i,
  longer_alt: Identifier
});
