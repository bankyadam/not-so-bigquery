const TOKENS = require('../../tokens');

module.exports = ($) => {
  $.RULE('fromClause', () => {
    $.CONSUME(TOKENS.From);
    $.SUBRULE($.fromItem);
  });

  $.RULE('fromItem', () => {
    $.OPTION2(() => {
      $.SUBRULE1($.projectName);
    });
    $.OPTION1(() => {
      $.SUBRULE2($.datasetName);
    });
    $.SUBRULE($.tableName);
  });

  $.RULE('projectName', () => {
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.IdentifierQualifier);
  });

  $.RULE('datasetName', () => {
    $.CONSUME(TOKENS.Identifier);
    $.CONSUME(TOKENS.IdentifierQualifier);
  });

  $.RULE('tableName', () => {
    $.CONSUME(TOKENS.Identifier);
  });
};
