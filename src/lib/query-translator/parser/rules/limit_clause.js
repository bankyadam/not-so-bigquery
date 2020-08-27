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
    $.CONSUME(TOKENS.Limit);
    $.OPTION(() => $.CONSUME(TOKENS.Offset));
  });
};
