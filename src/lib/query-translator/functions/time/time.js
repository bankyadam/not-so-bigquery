'use strict';

module.exports = function(ctx) {
  switch (ctx.expression.length) {
    case 3:
      return [
        '\'',
        this.visit(ctx.expression[0]),
        ':',
        this.visit(ctx.expression[1]),
        ':',
        this.visit(ctx.expression[2]),
        '\'',
        '::TIME'
      ].join('');

    case 2:
      return [
        '(',
        this.visit(ctx.expression[0]),
        ' ',
        'AT TIME ZONE',
        ' ',
        this.visit(ctx.expression[1]),
        ')',
        '::TIME'
      ].join('');

    case 1:
      return ['(', this.visit(ctx.expression[0]), ')', '::TIME'].join('');
  }
};
