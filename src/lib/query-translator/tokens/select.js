'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Select',
  pattern: /SELECT/i,
  longer_alt: Identifier
});
