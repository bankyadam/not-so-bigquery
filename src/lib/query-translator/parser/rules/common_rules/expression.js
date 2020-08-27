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
      { ALT: () => $.SUBRULE($.namedQueryParameter) }
    ]);
    $.OPTION(() => $.SUBRULE($.asAlias));
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
};
