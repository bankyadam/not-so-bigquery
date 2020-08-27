'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z_][a-zA-Z0-9_~\-]*|`[\S ]+`/
});
