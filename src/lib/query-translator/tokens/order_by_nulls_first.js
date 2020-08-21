const { createToken } = require('chevrotain');

module.exports = createToken({
  name: "OrderByNullsFirst",
  pattern: /NULLS FIRST/
});
