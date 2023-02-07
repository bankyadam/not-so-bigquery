import { sprintf } from 'sprintf-js';
import replaceTemplatePatterns from './common/replace_date_and_time_patterns';

export default function(ctx) {
  const datePart = this.visit(ctx.expression[0]);
  const dateExpression = this.visit(ctx.expression[1]);
  return sprintf('TO_DATE(%s, %s)', dateExpression, replaceTemplatePatterns(datePart));
}
