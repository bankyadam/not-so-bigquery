'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Join',
  pattern: /JOIN/i,
  longer_alt: Identifier
});
