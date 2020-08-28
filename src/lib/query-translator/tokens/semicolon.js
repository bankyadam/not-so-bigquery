'use strict';

const { Lexer, createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Semicolon',
  pattern: /;/,
  group: Lexer.SKIPPED
});
