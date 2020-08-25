'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'GroupBy',
  pattern: /GROUP BY/i,
  longer_alt: Identifier
});
