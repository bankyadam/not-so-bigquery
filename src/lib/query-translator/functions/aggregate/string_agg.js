'use strict';

const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  let sql = 'STRING_AGG(%(distinct)s %(value)s, %(delimiter)s %(orderBy)s) %(window)s';
  const distinct = ctx.SelectDistinct ? 'DISTINCT' : '';
  const value = this.visit(ctx.expression[0]);

  let delimiter = '\',\'';
  if (ctx.expression[1]) {
    delimiter = this.visit(ctx.expression[1]);
  }

  let orderByClause = '';
  if (ctx.orderByClause) {
    orderByClause = this.visit(ctx.orderByClause[0]);
  }

  let windowSpecification = '';
  if (ctx.windowSpecification) {
    windowSpecification = this.visit(ctx.windowSpecification);
  }

  let limit = '';
  if (ctx.limitClause) {
    limit = ctx.limitClause[0].children.Numeric[0].image;
    sql = 'ARRAY_TO_STRING((ARRAY_AGG(%(distinct)s %(value)s %(orderBy)s))[0:%(limit)d], %(delimiter)s) %(window)s';
  }

  return sprintf(sql, { distinct, value, orderBy: orderByClause, limit, delimiter, window: windowSpecification });
};
