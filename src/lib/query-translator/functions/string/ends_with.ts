export default function(ctx) {
  return [
    'STARTS_WITH(',
    'REVERSE(', this.visit(ctx.expression[0]), ')',
    ',',
    'REVERSE(', this.visit(ctx.expression[1]), ')',
    ')'
  ].join('');
}
