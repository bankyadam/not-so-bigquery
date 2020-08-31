'use strict';

const { Lexer } = require('chevrotain');
const TOKENS = require('../tokens');

const lexerDefinition = [
  TOKENS.WhiteSpace,

  TOKENS.Comment,

  TOKENS.String,
  TOKENS.Numeric,

  TOKENS.With,
  TOKENS.Select,
  TOKENS.SelectDistinct,
  TOKENS.SelectAll,
  TOKENS.From,
  TOKENS.JoinType,
  TOKENS.Join,
  TOKENS.On,
  TOKENS.Using,
  TOKENS.Where,
  TOKENS.GroupBy,
  TOKENS.Having,
  TOKENS.OrderBy,
  TOKENS.OrderByAsc,
  TOKENS.OrderByDesc,
  TOKENS.OrderByNullsFirst,
  TOKENS.OrderByNullsLast,
  TOKENS.Limit,
  TOKENS.Offset,
  TOKENS.As,

  TOKENS.Backtick,
  TOKENS.Semicolon,
  TOKENS.Asterisk,
  TOKENS.Comma,
  TOKENS.IdentifierQualifier,
  TOKENS.AtCharacter,
  TOKENS.LeftParenthesis,
  TOKENS.RightParenthesis,

  TOKENS.OperatorBinary,
  TOKENS.Cast,
  TOKENS.Not,
  TOKENS.And,

  TOKENS.LiteralConstant,

  TOKENS.Identifier
];

module.exports = new Lexer(lexerDefinition);
