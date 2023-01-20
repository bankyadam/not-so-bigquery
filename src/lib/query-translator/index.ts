import lexer from './lexer';
import parser from './parser';
import visitorFactory from './visitor/factory';

const visitor = visitorFactory(parser);

export default (query, projectId) => {
  parser.input = lexer.tokenize(query).tokens;
  const selectStatement = parser.selectStatement();

  if (parser.errors.length > 0) {
    console.dir(parser.errors, { depth: 10 });
  }
  visitor.defaultProjectId = projectId;
  return visitor.visit(selectStatement);
};
