/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('expression', () => {
    $.CONSUME(TOKENS.Identifier);
  });
};
