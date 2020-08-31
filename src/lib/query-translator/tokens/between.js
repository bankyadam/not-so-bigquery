'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Between',
  pattern: /BETWEEN/i,
  longer_alt: Identifier
});
