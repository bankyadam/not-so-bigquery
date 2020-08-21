const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('select', () => {
    $.CONSUME(TOKENS.Select);
    $.SUBRULE($.selectList);
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
    ])
  });
};
