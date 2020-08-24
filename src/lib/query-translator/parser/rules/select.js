/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('select', () => {
    $.CONSUME(TOKENS.Select);
    $.OPTION(() => $.SUBRULE($.selectModifier));
    $.SUBRULE($.selectList);
  });

  $.RULE('selectModifier', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.SelectDistinct) },
      { ALT: () => $.CONSUME(TOKENS.SelectAll) }
    ]);
  });

  $.RULE('selectList', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.selectExpression)
    });
  });

  $.RULE('selectExpression', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.Asterisk) },
      { ALT: () => $.CONSUME(TOKENS.Integer) },
      { ALT: () => $.CONSUME(TOKENS.Identifier) }
    ]);
  });
};
