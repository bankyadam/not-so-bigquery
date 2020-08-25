/* eslint-disable new-cap */
'use strict';

/**
 * @summary FINAL
 *
 * query_statement:
 *     query_expr
 */
module.exports = ($) => {
  $.RULE('selectStatement', () => {
    $.SUBRULE($.queryExpression);
  });

  require('./query_expression')($);
};
