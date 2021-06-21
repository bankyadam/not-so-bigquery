'use strict';

module.exports = function(ctx) {
  return ['TO_JSONB(', this.visit(ctx.expression[0]), ')::JSONB'].join('');
};
