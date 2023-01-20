import { sprintf } from 'sprintf-js';

export default function(ctx) {
  // Can't use .visit(), because this is not an expression, but a literal
  const datePart = ctx.expression[2].children.atomicExpression[0]
    .children.identifier[0].children.AnyWord[0].image.toUpperCase();
  const dateExpression1 = this.visit(ctx.expression[0]);
  const dateExpression2 = this.visit(ctx.expression[1]);
  return sprintf('DATE_DIFF(\'%s\', %s, %s)', datePart, dateExpression1, dateExpression2);
}
