export default function(ctx) {
  switch (ctx.expression.length) {
    case 3:
      return [
        'MAKE_DATE(',
        this.visit(ctx.expression[0]),
        ',',
        this.visit(ctx.expression[1]),
        ',',
        this.visit(ctx.expression[2]),
        ')'
      ].join('');

    case 2:
      return [
        '(',
        this.visit(ctx.expression[0]),
        ' ',
        'AT TIME ZONE',
        ' ',
        this.visit(ctx.expression[1]),
        ')',
        '::DATE'
      ].join('');

    case 1:
      return ['(', this.visit(ctx.expression[0]), ')', '::DATE'].join('');
  }
}
