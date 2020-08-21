const lexer = require('./lexer');
const parser = require('./parser');
const visitorFactory = require('./visitor/factory');
const visitor = visitorFactory(parser);

module.exports = (query, projectId) => {
  parser.input = lexer.tokenize(query).tokens;
  visitor.defaultProjectId = projectId;
  return visitor.visit(parser.selectStatement());
};
