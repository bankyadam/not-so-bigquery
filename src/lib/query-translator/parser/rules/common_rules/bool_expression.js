/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('boolExpression', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.binaryExpression) },
      { ALT: () => $.SUBRULE($.unaryExpression) }
    ]);
  });

  $.RULE('unaryExpression', () => {
    $.CONSUME(TOKENS.OperatorUnary);
    $.SUBRULE($.atomicExpression);
  });

  $.RULE('binaryExpression', () => {
    $.SUBRULE($.atomicExpression);
    $.MANY(() => {
      $.CONSUME(TOKENS.OperatorBinary);
      $.SUBRULE1($.atomicExpression);
    });
  });

  $.RULE('atomicExpression', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.parenthesisExpression) },
      { ALT: () => $.SUBRULE($.expression) }
    ]);
  });

  $.RULE('parenthesisExpression', () => {
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.boolExpression);
    $.CONSUME(TOKENS.RightParenthesis);
  });
};
