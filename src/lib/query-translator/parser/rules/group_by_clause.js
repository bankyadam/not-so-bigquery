/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 *     [ GROUP BY { expression [, ...] | #> ROLLUP ( expression [, ...] ) <# } ]
 */
module.exports = ($) => {
  $.RULE('groupByClause', () => {
    $.CONSUME(TOKENS.GroupBy);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.groupByExpression)
    });
  });

  $.RULE('groupByExpression', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.Numeric) },
      { ALT: () => $.SUBRULE($.identifier) }
    ]);
  });
};
