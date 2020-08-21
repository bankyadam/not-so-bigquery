const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: "GroupBy",
  pattern: /GROUP BY/,
  longer_alt: Identifier
});