'use strict';
const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  const datePart = this.visit(ctx.expression[1]).toUpperCase();
  const dateExpression = this.visit(ctx.expression[0]);
  let sql = '';

  switch (datePart) {
    case 'ISOYEAR':
      sql = 'TO_DATE(TO_CHAR(DATE_TRUNC(\'YEAR\', %1$s) + INTERVAL \'1 WEEK\', \'iyyy-iw\'), \'iyyy-iw\')';
      break;

    case 'WEEK':
      sql = '(DATE_TRUNC(\'%2$s\', %1$s) - INTERVAL \'1 DAY\')::DATE';
      break;

    default:
      sql = 'DATE_TRUNC(\'%2$s\', %1$s)::DATE';
  }

  return sprintf(sql, dateExpression, datePart);
};
