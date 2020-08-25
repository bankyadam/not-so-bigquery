/* eslint-disable new-cap */

'use strict';

// eslint-disable-next-line no-unused-vars
const TOKENS = require('../../tokens');

/**
 * query_statement:
 *     query_expr
 */
module.exports = ($) => {
  $.RULE('selectStatement', () => {
    $.SUBRULE($.queryExpression);
  });
};
