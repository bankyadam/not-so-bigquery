'use strict';

const { Lexer, createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Comment',
  // eslint-disable-next-line security/detect-unsafe-regex
  pattern: /(--|#) [^\n]*|\/\*[\s\n]([\s\S\n]+?[\n\s])?\*\//i,
  group: Lexer.SKIPPED
});
