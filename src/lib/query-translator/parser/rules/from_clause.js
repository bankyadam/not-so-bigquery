/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * @summary FINAL
 *
 *     [ FROM from_item  [, ...] ]
 */
module.exports = ($) => {
  $.RULE('fromClause', () => {
    $.CONSUME(TOKENS.From);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.fromItem)
    });
  });

  require('./from_item')($);
};
