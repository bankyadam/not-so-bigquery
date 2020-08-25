'use strict';

/* eslint-disable new-cap */
const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 *     [ LIMIT count [ OFFSET skip_rows ] ]
 */
module.exports = ($) => {
  $.RULE('limitClause', () => {
    $.CONSUME1(TOKENS.Limit);
    $.CONSUME1(TOKENS.Integer, { LABEL: 'count' });
    $.OPTION(() => {
      $.SUBRULE($.offsetClause);
    });
  });

  $.RULE('offsetClause', () => {
    $.CONSUME2(TOKENS.Offset);
    $.CONSUME2(TOKENS.Integer, { LABEL: 'skip_rows' });
  });
};
