'use strict';

const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  const timePart = this.visit(ctx.functionParameter[2]).toUpperCase();
  const timeExpression1 = this.visit(ctx.functionParameter[0]);
  const timeExpression2 = this.visit(ctx.functionParameter[1]);
  return sprintf('TIME_DIFF(\'%s\', %s, %s)', timePart, timeExpression1, timeExpression2);
};
