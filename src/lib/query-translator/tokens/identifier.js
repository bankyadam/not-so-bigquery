'use strict';

const { createToken } = require('chevrotain');
const AnyWord = require('./anyword');

module.exports = createToken({
  name: 'Identifier',
  pattern: /[a-z_][a-z0-9_~\-]*|`[\S ]+`/i,
  categories: [AnyWord]
});
