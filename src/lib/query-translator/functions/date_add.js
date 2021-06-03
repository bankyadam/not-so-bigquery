'use strict';

module.exports = function(ctx) {
  return [
    '(',
    this.visit(ctx.expression[0]),
    ' ',
    '+',
    ' ',
    this.visit(ctx.expression[1]),
    ')',
    '::DATE'
  ].join('');
};
