'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Not',
  pattern: /NOT/i,
  longer_alt: Identifier
});
