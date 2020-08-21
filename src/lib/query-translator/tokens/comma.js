const { createToken } = require('chevrotain');

module.exports = createToken({
  name: "Comma",
  pattern: /,/
});
