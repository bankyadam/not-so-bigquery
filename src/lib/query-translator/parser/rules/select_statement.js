/* eslint-disable new-cap */

'use strict';

// eslint-disable-next-line no-unused-vars
const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('selectStatement', () => {
    $.SUBRULE($.queryExpression);
  });

  $.RULE('queryExpression', () => {
    $.SUBRULE($.select);
    $.OPTION1(() => {
      $.SUBRULE1($.fromClause);
    });
    $.OPTION4(() => {
      $.SUBRULE4($.groupByClause);
    });
    $.OPTION2(() => {
      $.SUBRULE2($.orderByClause);
    });
    $.OPTION3(() => {
      $.SUBRULE3($.limitClause);
    });
  });
};
