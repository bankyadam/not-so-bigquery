const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: "SelectDistinct",
  pattern: /DISTINCT/,
  longer_alt: Identifier
});
