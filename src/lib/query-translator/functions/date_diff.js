'use strict';

module.exports = function(ctx) {
  return [
    'DATE_DIFF',
    '(',
    '\'', this.visit(ctx.expression[2]).toUpperCase(), '\'',
    ',',
    this.visit(ctx.expression[0]),
    ',',
    this.visit(ctx.expression[1]),
    ')'
  ].join('');
};
