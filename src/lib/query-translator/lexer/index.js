'use strict';

const { Lexer } = require('chevrotain');
const TOKENS = require('../tokens');

const lexerDefinition = [
  TOKENS.WhiteSpace,
  TOKENS.With,
  TOKENS.LeftParenthesis,
  TOKENS.RightParenthesis,
  TOKENS.Select,
  TOKENS.SelectDistinct,
  TOKENS.SelectAll,
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
  TOKENS.As,
  TOKENS.Backtick,
  TOKENS.Comma,
  TOKENS.IdentifierQualifier,
  TOKENS.AtCharacter,
  TOKENS.Identifier,
  TOKENS.Integer
];

module.exports = new Lexer(lexerDefinition);
