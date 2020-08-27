'use strict';

const { Lexer } = require('chevrotain');
const TOKENS = require('../tokens');

const lexerDefinition = [
  TOKENS.WhiteSpace,

  TOKENS.String,
  TOKENS.Numeric,


  TOKENS.With,
  TOKENS.Select,
  TOKENS.SelectDistinct,
  TOKENS.SelectAll,
  TOKENS.From,
  TOKENS.Where,
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
  TOKENS.Asterisk,
  TOKENS.Comma,
  TOKENS.IdentifierQualifier,
  TOKENS.AtCharacter,
  TOKENS.LeftParenthesis,
  TOKENS.RightParenthesis,

  TOKENS.OperatorUnary,
  TOKENS.OperatorBinary,

  TOKENS.LiteralConstant,

  TOKENS.Identifier
];

module.exports = new Lexer(lexerDefinition);
