const { Lexer } = require('chevrotain');
const TOKENS = require('../tokens');

const lexerDefinition = [
  TOKENS.WhiteSpace,
  TOKENS.Select,
  TOKENS.Asterisk,
  TOKENS.From,
  TOKENS.GroupBy,
  TOKENS.OrderBy,
  TOKENS.OrderByAsc,
  TOKENS.OrderByDesc,
  TOKENS.OrderByNullsFirst,
  TOKENS.OrderByNullsLast,
  TOKENS.Limit,
  TOKENS.Offset,
  TOKENS.Comma,
  TOKENS.IdentifierQualifier,
  TOKENS.Identifier,
  TOKENS.Integer
];

module.exports = new Lexer(lexerDefinition);