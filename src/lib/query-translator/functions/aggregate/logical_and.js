'use strict';

module.exports = function(ctx) {
  return ['BOOL_AND(', this.visit(ctx.expression[0]), ')'].join(' ');
};
