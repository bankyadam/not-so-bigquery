'use strict';

module.exports = function(ctx) {
  return ['BOOL_OR(', this.visit(ctx.functionParameter[0]), ')'].join(' ');
};
