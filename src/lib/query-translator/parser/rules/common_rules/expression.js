/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.literalValue) },
      { ALT: () => $.CONSUME(TOKENS.Asterisk) },
      { ALT: () => $.SUBRULE($.function) },
      { ALT: () => $.SUBRULE($.identifier) },
      { ALT: () => $.SUBRULE($.cast) },
      { ALT: () => $.SUBRULE($.namedQueryParameter) }
    ]);
  });

  $.RULE('literalValue', () => {
    $.OR([
      { ALT: () => $.CONSUME(TOKENS.LiteralConstant) },
      { ALT: () => $.CONSUME(TOKENS.Numeric) },
      { ALT: () => $.CONSUME(TOKENS.String) }
    ]);
  });

  $.RULE('function', () => {
    $.CONSUME(TOKENS.Identifier, { LABEL: 'functionName' });
    $.CONSUME(TOKENS.LeftParenthesis);
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.expression)
    });
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('identifier', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => $.CONSUME(TOKENS.Identifier)
    });
    $.OPTION(() => {
      $.CONSUME(TOKENS.IdentifierQualifier);
      $.CONSUME(TOKENS.Asterisk);
    });
  });

  $.RULE('namedQueryParameter', () => {
    $.CONSUME(TOKENS.AtCharacter);
    $.CONSUME(TOKENS.Identifier);
  });

  $.RULE('cast', () => {
    $.CONSUME(TOKENS.Cast);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.expression);
    $.CONSUME(TOKENS.As);
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.RightParenthesis);
  });
};
