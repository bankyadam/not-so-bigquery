'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Offset',
  pattern: /OFFSET/i,
  longer_alt: Identifier
});
