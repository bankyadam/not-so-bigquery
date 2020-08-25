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
    $.OR([
      { ALT: () => {
          $.CONSUME1(TOKENS.Backtick);
          $.SUBRULE1($.tableIdentifier);
          $.CONSUME2(TOKENS.Backtick);
      } },
      { ALT: () => $.SUBRULE2($.tableIdentifier) }
    ]);
    $.OPTION3(() => $.SUBRULE3($.tableAlias));
  });

  $.RULE('tableIdentifier', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => $.CONSUME(TOKENS.Identifier)
    })
  });

  $.RULE('tableAlias', () => {
    $.OPTION(() => $.CONSUME(TOKENS.As));
    $.CONSUME(TOKENS.Identifier, { LABEL: 'alias'});
  });
};
