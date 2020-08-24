'use strict';

const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'Integer',
  pattern: /0|[1-9]\d*/
});
