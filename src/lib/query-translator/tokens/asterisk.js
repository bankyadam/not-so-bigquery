const { createToken } = require('chevrotain');

module.exports = createToken({
  name: "Asterisk",
  pattern: /\*/
});
