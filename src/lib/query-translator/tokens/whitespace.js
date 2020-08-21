const { Lexer, createToken } = require('chevrotain');

module.exports = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED
});
