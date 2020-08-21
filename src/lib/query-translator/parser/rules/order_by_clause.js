const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('orderByClause', () => {
    $.CONSUME(TOKENS.OrderBy);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => {
        $.SUBRULE($.orderByItem);
      }
    });
  });

  $.RULE('orderByItem', () => {
    $.SUBRULE($.expression);
    $.OPTION1(() => {
      $.OR1([
        { ALT: () => $.CONSUME(TOKENS.OrderByAsc) },
        { ALT: () => $.CONSUME(TOKENS.OrderByDesc) }
      ]);
    });
    $.OPTION2(() => {
      $.OR2([
        { ALT: () => $.CONSUME(TOKENS.OrderByNullsFirst) },
        { ALT: () => $.CONSUME(TOKENS.OrderByNullsLast) }
      ]);
    });
  });
};
