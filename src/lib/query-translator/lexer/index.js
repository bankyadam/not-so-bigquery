'use strict';

const { Lexer } = require('chevrotain');
const TOKENS = require('../tokens');

const lexerDefinition = [
  TOKENS.WhiteSpace,

  TOKENS.Comment,

  TOKENS.String,
  TOKENS.Numeric,
  TOKENS.NumericHex,
  TOKENS.Interval,

  TOKENS.With,
  TOKENS.SetOperator,
  TOKENS.Select,
  TOKENS.SelectDistinct,
  TOKENS.SelectAll,
  TOKENS.From,
  TOKENS.JoinType,
  TOKENS.Join,
  TOKENS.On,
  TOKENS.In,
  TOKENS.Using,
  TOKENS.Unnest,
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
  TOKENS.IgnoreRespectNulls,

  TOKENS.Backtick,
  TOKENS.Semicolon,
  TOKENS.Asterisk,
  TOKENS.Comma,
  TOKENS.IdentifierQualifier,
  TOKENS.AtCharacter,
  TOKENS.LeftParenthesis,
  TOKENS.RightParenthesis,
  TOKENS.LeftSquareBracket,
  TOKENS.RightSquareBracket,

  TOKENS.OperatorBinary,
  TOKENS.Case,
  TOKENS.When,
  TOKENS.Then,
  TOKENS.Else,
  TOKENS.End,
  TOKENS.Cast,
  TOKENS.Extract,
  TOKENS.Over,
  TOKENS.PartitionBy,
  TOKENS.RowsRange,
  TOKENS.Unbounded,
  TOKENS.CurrentRow,
  TOKENS.Following,
  TOKENS.Preceding,
  TOKENS.Between,
  TOKENS.Not,
  TOKENS.And,

  TOKENS.LiteralConstant,

  TOKENS.Struct,
  TOKENS.Identifier,

  TOKENS.AnyWord
];

module.exports = new Lexer(lexerDefinition);
