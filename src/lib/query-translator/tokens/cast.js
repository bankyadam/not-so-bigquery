'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Cast',
  pattern: /CAST/i,
  longer_alt: Identifier
});
