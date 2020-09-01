'use strict';

const { createToken, Lexer } = require('chevrotain');

module.exports = createToken({
  name: 'AnyWord',
  pattern: Lexer.NA
});
