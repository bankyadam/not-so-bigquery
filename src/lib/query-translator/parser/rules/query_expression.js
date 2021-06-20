/* eslint-disable new-cap */

'use strict';

// eslint-disable-next-line no-unused-vars
const TOKENS = require('../../tokens');

/**
 * query_expr:
 *     [ WITH with_query_name AS ( query_expr ) [, ...] ]
 *     { select | ( query_expr ) #> | query_expr set_op query_expr <# }
 *     [ ORDER BY expression [{ ASC | DESC }] [, ...] ]
 *     [ LIMIT count [ OFFSET skip_rows ] ]
 */
module.exports = ($) => {
  $.RULE('queryExpression', () => {
    $.OPTION1(() => {
      $.SUBRULE1($.withClause);
    });
    $.OR([
      { ALT: () => $.SUBRULE($.select) },
      { ALT: () => $.SUBRULE($.bracketedQueryExpression) }
    ]);
    $.OPTION2(() => {
      $.SUBRULE2($.orderByClause);
    });
    $.OPTION3(() => {
      $.SUBRULE3($.limitClause);
    });
    $.OPTION4(() => {
      $.CONSUME(TOKENS.SetOperator);
      $.SUBRULE($.queryExpression, { LABEL: 'rightSide' });
    });
  });

  $.RULE('bracketedQueryExpression', () => {
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.queryExpression);
    $.CONSUME(TOKENS.RightParenthesis);
  });

  require('./with_clause')($);
  require('./select')($);
  require('./order_by_clause')($);
  require('./limit_clause')($);
};
