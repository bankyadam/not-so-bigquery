'use strict';

const lexer = require('./lexer');
const parser = require('./parser');
const visitorFactory = require('./visitor/factory');
const visitor = visitorFactory(parser);

module.exports = (query, projectId) => {
  parser.input = lexer.tokenize(query).tokens;
  const selectStatement = parser.selectStatement();

  if (parser.errors.length > 0) {
    console.dir(parser.errors, { depth: 10 });
  }
  visitor.defaultProjectId = projectId;
  return visitor.visit(selectStatement);
};
