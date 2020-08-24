'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Offset',
  pattern: /OFFSET/,
  longer_alt: Identifier
});
