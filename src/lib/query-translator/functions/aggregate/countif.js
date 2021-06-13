'use strict';

module.exports = function(ctx) {
  return ['COUNT(CASE WHEN', this.visit(ctx.functionParameter[0]), 'THEN 1 END)'].join(' ');
};
