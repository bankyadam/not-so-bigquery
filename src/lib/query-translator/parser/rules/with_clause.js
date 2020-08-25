/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 * [ WITH with_query_name AS ( query_expr ) [, ...] ]
 */
module.exports = ($) => {
  $.RULE('withClause', () => {
    $.CONSUME(TOKENS.With);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => {
        $.SUBRULE($.withItem);
      }
    });
  });

  $.RULE('withItem', () => {
    $.CONSUME(TOKENS.Identifier, { LABEL: 'with_query_name' });
    $.CONSUME(TOKENS.As);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.queryExpression);
    $.CONSUME(TOKENS.RightParenthesis);
  });
};
