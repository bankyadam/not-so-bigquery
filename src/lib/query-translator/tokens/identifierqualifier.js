const { createToken } = require('chevrotain');

module.exports = createToken({
  name: 'IdentifierQualifier',
  pattern: /\./
});
