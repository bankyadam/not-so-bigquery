import { sprintf } from 'sprintf-js';

export default function(ctx) {
  const sqlParts = ['ARRAY_AGG(%(distinct)s %(value)s %(orderByClause)s)'];
  const distinct = ctx.SelectDistinct ? 'DISTINCT' : '';
  const value = this.visit(ctx.expression[0]);

  let orderByClause = '';
  if (ctx.orderByClause) {
    orderByClause = this.visit(ctx.orderByClause[0]);
  }

  const filter = '';
  if (ctx.IgnoreRespectNulls) {
    if (ctx.IgnoreRespectNulls[0].image.toUpperCase().indexOf('IGNORE') !== -1) {
      sqlParts.push('FILTER (WHERE (%(value)s) IS NOT NULL)');
    }
  }

  let limit = '';
  if (ctx.limitClause) {
    sqlParts.unshift('(');
    sqlParts.push(')[0:%(limit)d]');
    limit = ctx.limitClause[0].children.Numeric[0].image;
  }

  let windowSpecification = '';
  if (ctx.windowSpecification) {
    windowSpecification = this.visit(ctx.windowSpecification);
  }

  sqlParts.push('%(windowSpecification)s');

  return sprintf(sqlParts.join(' '), { distinct, value, orderByClause, limit, filter, windowSpecification });
}
