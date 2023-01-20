import { sprintf } from 'sprintf-js';

export default function(ctx) {
  // Can't use .visit(), because this is not an expression, but a literal
  const timePart = ctx.expression[2].children.atomicExpression[0]
    .children.identifier[0].children.AnyWord[0].image.toUpperCase();
  const timeExpression1 = this.visit(ctx.expression[0]);
  const timeExpression2 = this.visit(ctx.expression[1]);
  return sprintf('TIME_DIFF(\'%s\', %s, %s)', timePart, timeExpression1, timeExpression2);
}
