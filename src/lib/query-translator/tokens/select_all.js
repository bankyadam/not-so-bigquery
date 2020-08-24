'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'SelectAll',
  pattern: /ALL/,
  longer_alt: Identifier
});
