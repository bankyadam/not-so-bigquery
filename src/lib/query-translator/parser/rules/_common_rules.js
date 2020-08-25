/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.function) },
      { ALT: () => $.SUBRULE($.identifier) },
      { ALT: () => $.SUBRULE($.namedQueryParameter) },
      { ALT: () => $.CONSUME(TOKENS.Asterisk) },
      { ALT: () => $.CONSUME(TOKENS.Integer) }
    ]);
    $.OPTION(() => $.SUBRULE($.asAlias));
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

  $.RULE('asAlias', () => {
    $.OPTION(() => $.CONSUME(TOKENS.As));
    $.CONSUME(TOKENS.Identifier, { LABEL: 'alias' });
  });
};
