'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OrderBy',
  pattern: /ORDER BY/i,
  longer_alt: Identifier
});
