import { sprintf } from 'sprintf-js';

export default function(ctx) {
  const dateExpression = this.visit(ctx.expression[0]);
  if (ctx.expression.length > 1) {
    const datePart = ctx.expression[1].children.atomicExpression[0]
      .children.identifier[0].children.AnyWord[0].image.toUpperCase();
    return sprintf('LAST_DAY(%s, \'%s\')', dateExpression, datePart);
  }
  return sprintf('LAST_DAY(%s)', dateExpression);
}
