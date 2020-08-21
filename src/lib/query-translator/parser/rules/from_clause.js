const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('fromClause', () => {
    $.CONSUME(TOKENS.From);
    $.SUBRULE($.tableName);
  });

  $.RULE('tableName', () => {
    $.OPTION2(() => {
      $.SUBRULE1($.projectId);
    });
    $.OPTION1(() => {
      $.SUBRULE2($.datasetId);
    });
    $.SUBRULE($.tableId);
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
};
