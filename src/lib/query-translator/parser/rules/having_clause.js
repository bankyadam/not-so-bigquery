/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 *     [ HAVING bool_expression ]
 */
module.exports = ($) => {
  $.RULE('havingClause', () => {
    $.CONSUME(TOKENS.Having);
    $.SUBRULE($.boolExpression);
  });
};
