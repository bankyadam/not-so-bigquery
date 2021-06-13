'use strict';

module.exports = function(ctx) {
  return ['BOOL_AND(', this.visit(ctx.functionParameter[0]), ')'].join(' ');
};
