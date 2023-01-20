export default function(ctx) {
  return ['COUNT(CASE WHEN', this.visit(ctx.expression[0]), 'THEN 1 END)'].join(' ');
}
