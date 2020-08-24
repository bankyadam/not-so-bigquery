/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('limitClause', () => {
    $.CONSUME1(TOKENS.Limit);
    $.CONSUME1(TOKENS.Integer);
    $.OPTION(() => {
      $.SUBRULE($.offsetClause);
    });
  });

  $.RULE('offsetClause', () => {
    $.CONSUME2(TOKENS.Offset);
    $.CONSUME2(TOKENS.Integer);
  });
};
