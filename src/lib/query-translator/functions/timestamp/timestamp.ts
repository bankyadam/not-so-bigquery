export default function(ctx) {
  if (ctx.expression.length === 1) {
    return [this.visit(ctx.expression[0]), '::TIMESTAMP'].join('');
  } else if (ctx.expression.length === 2) {
    return [
      '(',
      this.visit(ctx.expression[0]),
      ' ',
      'AT TIME ZONE',
      ' ',
      this.visit(ctx.expression[1]),
      ')',
      '::TIMESTAMP'
    ].join('');
  }
}
