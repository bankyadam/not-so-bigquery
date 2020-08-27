'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'Offset',
  pattern: /OFFSET (0|[1-9]\d*)/i,
  longer_alt: Identifier
});
