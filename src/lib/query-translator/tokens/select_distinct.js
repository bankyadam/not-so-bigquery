'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'SelectDistinct',
  pattern: /DISTINCT/i,
  longer_alt: Identifier
});
