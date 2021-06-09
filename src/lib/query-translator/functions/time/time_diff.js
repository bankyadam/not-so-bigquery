'use strict';

const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  const timePart = this.visit(ctx.expression[2]).toUpperCase();
  const timeExpression1 = this.visit(ctx.expression[0]);
  const timeExpression2 = this.visit(ctx.expression[1]);
  return sprintf('TIME_DIFF(\'%s\', %s, %s)', timePart, timeExpression1, timeExpression2);
};
