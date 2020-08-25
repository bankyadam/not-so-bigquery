/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 *     [ WHERE bool_expression ]
 */
module.exports = ($) => {
  $.RULE('whereClause', () => {
    $.CONSUME(TOKENS.Where);
    $.SUBRULE($.boolExpression);
  });
};
