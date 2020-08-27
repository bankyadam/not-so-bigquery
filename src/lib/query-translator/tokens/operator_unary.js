'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'OperatorUnary',
  pattern: /NOT/i,
  longer_alt: Identifier
});
