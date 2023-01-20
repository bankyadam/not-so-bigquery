export const compose = function(operand) {
  return function(ctx) {
    return [
      '(',
      this.visit(ctx.expression[0]),
      ' ',
      operand,
      ' ',
      this.visit(ctx.expression[1]),
      ')',
      '::DATE'
    ].join('');
  }
};

export default compose('+');
