const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('fromClause', () => {
    $.CONSUME(TOKENS.From);
    $.SUBRULE($.tableName);
  });

  $.RULE('tableName', () => {
    $.OPTION2(() => $.SUBRULE2($.projectId));
    $.OPTION1(() => $.SUBRULE1($.datasetId));
    $.SUBRULE($.tableId);
    $.OPTION3(() => $.SUBRULE3($.tableAlias));
  });

  $.RULE('projectId', () => {
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.IdentifierQualifier);
  });

  $.RULE('datasetId', () => {
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.IdentifierQualifier);
  });

  $.RULE('tableId', () => {
    $.CONSUME(TOKENS.Identifier);
  });

  $.RULE('tableAlias', () => {
    $.OPTION(() => $.CONSUME(TOKENS.FromAs));
    $.CONSUME(TOKENS.Identifier);
  });
};
