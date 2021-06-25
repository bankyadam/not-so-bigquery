'use strict';

const { sprintf } = require('sprintf-js');

module.exports = function(ctx) {
  const expression = this.visit(ctx.expression[0]);
  return sprintf('FIRST_VALUE(%1$s) OVER (PARTITION BY %1$s)', expression);
};
