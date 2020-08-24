/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('groupByClause', () => {
    $.CONSUME(TOKENS.GroupBy);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => {
        $.SUBRULE($.expression);
      }
    });
  });
};
