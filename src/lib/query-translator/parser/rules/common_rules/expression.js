/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.SUBRULE($.atomicExpression);
    $.OPTION2(() => $.SUBRULE($.binaryOperatorExpression));
  });

  $.RULE('atomicExpression', () => {
    $.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => $.SUBRULE($.function) },
        { ALT: () => $.SUBRULE($.identifier) },
        { ALT: () => $.SUBRULE($.unaryOperatorExpression) },
        { ALT: () => $.SUBRULE($.parenthesisExpression) },
        { ALT: () => $.SUBRULE($.cast) },
        { ALT: () => $.SUBRULE($.namedQueryParameter) },
        { ALT: () => $.SUBRULE($.literalValue) },
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

  $.RULE('literalValue', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.LiteralConstant) },
      { ALT: () => $.CONSUME(TOKENS.Numeric) },
      { ALT: () => $.CONSUME(TOKENS.String) }
    ]);
  });

  $.RULE('function', () => {
    $.CONSUME(TOKENS.Identifier, { LABEL: 'functionName' });
    $.CONSUME(TOKENS.LeftParenthesis);
    $.OPTION(() => {
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
    });
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('identifier', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => $.CONSUME(TOKENS.Identifier)
    });
    $.OPTION(() => {
      $.CONSUME(TOKENS.IdentifierQualifier);
      $.CONSUME(TOKENS.Asterisk);
    });
  });

  $.RULE('namedQueryParameter', () => {
    $.CONSUME(TOKENS.AtCharacter);
    $.CONSUME(TOKENS.Identifier);
  });

  $.RULE('cast', () => {
    $.CONSUME(TOKENS.Cast);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.expression);
    $.CONSUME(TOKENS.As);
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.RightParenthesis);
  });
};
