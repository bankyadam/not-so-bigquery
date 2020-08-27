/* eslint-disable new-cap */
'use strict';

const TOKENS = require('../../../tokens');

module.exports = ($) => {
  $.RULE('asAlias', () => {
    $.OPTION(() => $.CONSUME(TOKENS.As));
    $.CONSUME(TOKENS.Identifier, { LABEL: 'alias' });
  });
};
