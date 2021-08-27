/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.SUBRULE($.atomicExpression);
    $.OPTION1(() => $.OR([
      { ALT: () => $.SUBRULE($.betweenExpression) },
      { ALT: () => $.SUBRULE($.inExpression) }
    ]));
    $.OPTION2(() => $.SUBRULE($.binaryOperatorExpression));
  });

  $.RULE('atomicExpression', () => {
    $.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => $.SUBRULE($.unaryOperatorExpression) },
        { ALT: () => $.SUBRULE($.parenthesisExpression) },
        { ALT: () => $.SUBRULE($.dateExpression) },
        { ALT: () => $.SUBRULE($.intervalExpression) },
        { ALT: () => $.SUBRULE($.typelessStruct) },
        { ALT: () => $.SUBRULE($.cast) },
        { ALT: () => $.SUBRULE($.extract) },
        { ALT: () => $.SUBRULE($.function) },
        { ALT: () => $.SUBRULE($.literalValue) },
        { ALT: () => $.SUBRULE($.identifier) },
        { ALT: () => $.SUBRULE($.namedQueryParameter) },
        { ALT: () => $.SUBRULE($.array) },
        {
          ALT: () => {
            $.CONSUME2(TOKENS.LeftParenthesis);
            $.SUBRULE2($.queryExpression);
            $.CONSUME2(TOKENS.RightParenthesis);
          }
        }
      ]
    });
  });

  $.RULE('unaryOperatorExpression', () => {
    $.CONSUME(TOKENS.Not);
    $.SUBRULE($.expression);
  });

  $.RULE('binaryOperatorExpression', () => {
    $.SUBRULE($.binaryOperator);
    $.SUBRULE2($.expression, { LABEL: 'rhs' });
  });

  $.RULE('binaryOperator', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.OperatorBinary) },
      { ALT: () => $.CONSUME(TOKENS.And) }
    ]);
  });

  $.RULE('parenthesisExpression', () => {
    $.CONSUME(TOKENS.LeftParenthesis);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.expression)
    });
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('dateExpression', () => {
    $.CONSUME(TOKENS.Identifier, { LABEL: 'dateType' });
    $.CONSUME(TOKENS.String);
  });

  $.RULE('intervalExpression', () => {
    $.CONSUME(TOKENS.Interval);
    $.SUBRULE($.atomicExpression);
    $.CONSUME(TOKENS.Identifier, { LABEL: 'datePart' });
  });

  $.RULE('literalValue', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.LiteralConstant) },
      { ALT: () => $.CONSUME(TOKENS.Numeric) },
      { ALT: () => $.CONSUME(TOKENS.NumericHex) },
      { ALT: () => $.CONSUME(TOKENS.String) }
    ]);
  });

  $.RULE('array', () => {
    $.CONSUME(TOKENS.LeftSquareBracket);
    $.MANY_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.literalValue)
    });
    $.CONSUME(TOKENS.RightSquareBracket);
  });

  $.RULE('function', () => {
    $.CONSUME(TOKENS.Identifier, { LABEL: 'functionName' });
    $.CONSUME(TOKENS.LeftParenthesis);
    $.OPTION1(() => {
      $.OPTION2(() => {
        $.CONSUME(TOKENS.SelectDistinct);
      });
      $.OR([
        {
          ALT: () =>
            $.AT_LEAST_ONE_SEP({
              SEP: TOKENS.Comma,
              DEF: () => $.SUBRULE($.expression)
            })
        },
        { ALT: () => $.CONSUME(TOKENS.Asterisk) }
      ]);
      $.OPTION3(() => $.CONSUME(TOKENS.IgnoreRespectNulls));
      $.OPTION4(() => $.SUBRULE($.orderByClause));
      $.OPTION5(() => $.SUBRULE($.limitClause));
    });
    $.CONSUME(TOKENS.RightParenthesis);
    $.OPTION6(() => $.SUBRULE($.windowSpecification));
  });

  $.RULE('identifier', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => $.CONSUME(TOKENS.AnyWord)
    });
    $.OPTION(() => {
      $.CONSUME(TOKENS.IdentifierQualifier);
      $.CONSUME(TOKENS.Asterisk);
    });
  });

  $.RULE('namedQueryParameter', () => {
    $.CONSUME(TOKENS.AtCharacter);
    $.CONSUME(TOKENS.AnyWord);
  });

  $.RULE('cast', () => {
    $.CONSUME(TOKENS.Cast);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.expression);
    $.CONSUME(TOKENS.As);
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('extract', () => {
    $.CONSUME(TOKENS.Extract);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.CONSUME1(TOKENS.Identifier);
    $.CONSUME(TOKENS.From);
    $.SUBRULE($.expression);
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('inExpression', () => {
    $.OPTION(() => $.CONSUME(TOKENS.Not));
    $.CONSUME(TOKENS.In);
    $.SUBRULE($.expression);
  });

  $.RULE('betweenExpression', () => {
    $.OPTION(() => $.CONSUME(TOKENS.Not));
    $.CONSUME(TOKENS.Between);
    $.SUBRULE2($.atomicExpression, { LABEL: 'rhs_min' });
    $.CONSUME(TOKENS.And);
    $.SUBRULE3($.atomicExpression, { LABEL: 'rhs_max' });
  });

  $.RULE('typelessStruct', () => {
    $.CONSUME(TOKENS.Struct);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.MANY_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.structItem)
    });
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('structItem', () => {
    $.SUBRULE($.atomicExpression);
    $.OPTION(() => $.SUBRULE($.asAlias));
  });
};
