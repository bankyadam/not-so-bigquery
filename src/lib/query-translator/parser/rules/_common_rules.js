/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.CONSUME(TOKENS.Identifier);
  });

  $.RULE('asAlias', () => {
    $.OPTION(() => $.CONSUME(TOKENS.As));
    $.CONSUME(TOKENS.Identifier, { LABEL: 'alias' });
  });
};
