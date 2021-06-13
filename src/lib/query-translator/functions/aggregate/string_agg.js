'use strict';

module.exports = function(ctx) {
  const value = this.visit(ctx.functionParameter[0]);
  let delimiter = '\',\'';
  let windowSpecification = '';
  if (ctx.windowSpecification) {
    windowSpecification = this.visit(ctx.windowSpecification);
  }

  if (ctx.functionParameter[1]) {
    if (ctx.functionParameter[1].children.limitClause) {
      delimiter = this.visit(ctx.functionParameter[1].children.expression[0]);
      const limit = ctx.functionParameter[1].children.limitClause[0].children.Numeric[0].image;
      const orderByClause = ctx.functionParameter[1].children.orderByClause ?
        this.visit(ctx.functionParameter[1].children.orderByClause[0]) :
        '';
      return [
        'ARRAY_TO_STRING(',
        '(ARRAY_AGG(',
        ctx.SelectDistinct ? 'DISTINCT' : '',
        value,
        orderByClause,
        '))',
        '[0:', limit, '],',
        delimiter,
        ')',
        windowSpecification
      ].join(' ');
    }

    delimiter = this.visit(ctx.functionParameter[1]);
  }

  return [
    'STRING_AGG(', ctx.SelectDistinct ? 'DISTINCT' : '', value, ',', delimiter, ')',
    windowSpecification
  ].join(' ');
};
