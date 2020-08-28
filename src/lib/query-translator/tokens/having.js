'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Having',
  pattern: /HAVING/i,
  longer_alt: Identifier
});
