/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('boolExpression', () => {
    $.SUBRULE($.comparisonExpression);
  });

  $.RULE('comparisonExpression', () => {
    $.SUBRULE($.logicalExpression);
    $.MANY(() => {
      $.CONSUME(TOKENS.OperatorComparison);
      $.SUBRULE1($.logicalExpression);
    });
  });

  $.RULE('logicalExpression', () => {
    $.SUBRULE($.atomicExpression);
    $.MANY(() => {
      $.CONSUME(TOKENS.OperatorLogical);
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
