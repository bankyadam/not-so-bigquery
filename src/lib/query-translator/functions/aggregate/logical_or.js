'use strict';

module.exports = function(ctx) {
  return ['BOOL_OR(', this.visit(ctx.expression[0]), ')'].join(' ');
};
