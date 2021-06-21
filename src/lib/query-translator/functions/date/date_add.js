'use strict';

module.exports = function(ctx, operand) {
  return [
    '(',
    this.visit(ctx.expression[0]),
    ' ',
    operand,
    ' ',
    this.visit(ctx.expression[1]),
    ')',
    '::DATE'
  ].join('');
};

module.exports.OPERATION_ADD = '+';
module.exports.OPERATION_SUB = '-';
