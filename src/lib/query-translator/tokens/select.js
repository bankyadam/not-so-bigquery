const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: "Select",
  pattern: /SELECT/,
  longer_alt: Identifier
});
