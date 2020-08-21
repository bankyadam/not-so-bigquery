const { createToken } = require('chevrotain');

module.exports = createToken({
  name: "OrderByAsc",
  pattern: /ASC/
});
