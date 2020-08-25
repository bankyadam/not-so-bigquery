'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'As',
  pattern: /AS/,
  longer_alt: Identifier
});
