'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'SetOperator',
  pattern: /UNION( (ALL|DISTINCT))?|INTERSECT( DISTINCT)?|EXCEPT( DISTINCT)?/i
});
