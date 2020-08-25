'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OrderByAsc',
  pattern: /ASC/i,
  longer_alt: Identifier
});
