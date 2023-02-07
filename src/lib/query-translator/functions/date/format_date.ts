import replaceTemplatePatterns from './common/replace_date_and_time_patterns';

export default function(ctx) {
  const template = this.visit(ctx.expression[0]);
  const dateExpression = this.visit(ctx.expression[1]);
  return [
    'TO_CHAR(',
    dateExpression,
    ',',
    replaceTemplatePatterns(template),
    ')'
  ].join('');
}
