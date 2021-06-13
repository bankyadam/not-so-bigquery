'use strict';

const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  const datePart = this.visit(ctx.functionParameter[2]).toUpperCase();
  const dateExpression1 = this.visit(ctx.functionParameter[0]);
  const dateExpression2 = this.visit(ctx.functionParameter[1]);
  return sprintf('DATE_DIFF(\'%s\', %s, %s)', datePart, dateExpression1, dateExpression2);
};
