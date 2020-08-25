/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * from_item: {
 *     table_name [ [ AS ] alias ] [ FOR SYSTEM_TIME AS OF timestamp_expression ]  |
 *     join |
 *     ( query_expr ) [ [ AS ] alias ] |
 *     field_path |
 *     { UNNEST( array_expression ) | UNNEST( array_path ) | array_path }
 *         [ [ AS ] alias ] [ WITH OFFSET [ [ AS ] alias ] ] |
 *     with_query_name [ [ AS ] alias ]
 * }
 */
module.exports = ($) => {
  $.RULE('fromItem', () => {
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
    $.OPTION(() => $.CONSUME(TOKENS.As));
    $.CONSUME(TOKENS.Identifier);
  });
};
