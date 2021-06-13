'use strict';

module.exports = function(ctx) {
  switch (ctx.functionParameter.length) {
    case 3:
      return [
        '\'',
        this.visit(ctx.functionParameter[0]),
        ':',
        this.visit(ctx.functionParameter[1]),
        ':',
        this.visit(ctx.functionParameter[2]),
        '\'',
        '::TIME'
      ].join('');

    case 2:
      return [
        '(',
        this.visit(ctx.functionParameter[0]),
        ' ',
        'AT TIME ZONE',
        ' ',
        this.visit(ctx.functionParameter[1]),
        ')',
        '::TIME'
      ].join('');

    case 1:
      return ['(', this.visit(ctx.functionParameter[0]), ')', '::TIME'].join('');
  }
};
