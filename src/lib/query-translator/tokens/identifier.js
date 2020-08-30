'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Identifier',
  pattern: /[a-z_][a-z0-9_~\-]*|`[\S ]+`/i
});
