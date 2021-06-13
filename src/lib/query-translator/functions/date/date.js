'use strict';

module.exports = function(ctx) {
  switch (ctx.functionParameter.length) {
    case 3:
      return [
        '\'',
        this.visit(ctx.functionParameter[0]),
        '-',
        this.visit(ctx.functionParameter[1]),
        '-',
        this.visit(ctx.functionParameter[2]),
        '\'',
        '::DATE'
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
        '::DATE'
      ].join('');

    case 1:
      return ['(', this.visit(ctx.functionParameter[0]), ')', '::DATE'].join('');
  }
};
