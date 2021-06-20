'use strict';

module.exports = function(ctx) {
  return ['TO_JSONB(', this.visit(ctx.functionParameter[0]), ')::JSONB'].join('');
};
