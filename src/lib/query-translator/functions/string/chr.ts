export default function(ctx) {
  return [
    'CASE WHEN',
    this.visit(ctx.expression[0]),
    '= 0 THEN \'\' ELSE',
    'CHR(',
    this.visit(ctx.expression[0]),
    ')',
    'END'
  ].join(' ');
}
