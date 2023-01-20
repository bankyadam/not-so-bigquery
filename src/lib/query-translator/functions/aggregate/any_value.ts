import { sprintf } from 'sprintf-js';

export default function(ctx) {
  const expression = this.visit(ctx.expression[0]);
  return sprintf('FIRST_VALUE(%1$s) OVER (PARTITION BY %1$s)', expression);
}
