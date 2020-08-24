'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OrderBy',
  pattern: /ORDER BY/,
  longer_alt: Identifier
});
