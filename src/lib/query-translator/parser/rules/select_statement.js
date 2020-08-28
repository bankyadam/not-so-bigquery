/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../tokens');
/**
 * @summary FINAL
 *
 * query_statement:
 *     query_expr
 */
module.exports = ($) => {
  $.RULE('selectStatement', () => {
    $.SUBRULE($.queryExpression);
    $.OPTION(() => $.CONSUME(TOKENS.Semicolon));
  });

  require('./query_expression')($);
};
