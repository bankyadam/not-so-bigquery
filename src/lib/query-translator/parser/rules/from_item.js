/* eslint-disable new-cap */

'use strict';

const TOKENS = require('../../tokens');

/**
 * from_item: {
 *     table_name [[AS] alias] [ FOR SYSTEM_TIME AS OF timestamp_expression ]  |
 *     join |
 *     ( query_expr ) [[AS] alias] |
 *     #> field_path | <#
 *     #> { UNNEST(array_expression) | UNNEST(array_path) | array_path } [[AS] alias] [ WITH OFFSET [[AS] alias] ] | <#
 *     with_query_name [[AS] alias]
 * }
 */
module.exports = ($) => {
  $.RULE('fromItem', () => {
    $.OR([
      { ALT: () => $.SUBRULE($.tableName) },
      { ALT: () => $.SUBRULE($.subQuery) }
    ]);
    $.OPTION(() => $.MANY(() => $.SUBRULE($.join)));
  });

  $.RULE('tableName', () => {
    $.OR([
      {
        ALT: () => {
          $.CONSUME1(TOKENS.Backtick);
          $.SUBRULE1($.tableIdentifier);
          $.CONSUME2(TOKENS.Backtick);
        }
      },
      { ALT: () => $.SUBRULE2($.tableIdentifier) }
    ]);
    $.OPTION3(() => $.SUBRULE3($.asAlias));
  });

  $.RULE('tableIdentifier', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => $.CONSUME(TOKENS.Identifier)
    });
  });

  /**
   *     ( query_expr ) [ [ AS ] alias ] |
   */
  $.RULE('subQuery', () => {
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.queryExpression);
    $.CONSUME(TOKENS.RightParenthesis);
    $.OPTION(() => {
      $.SUBRULE($.asAlias);
    });
  });

  /**
   * join:
   *    from_item [ join_type ] JOIN from_item
   *    [ ON bool_expression | USING ( join_column [, ...] ) ]
   *
   * join_type:
   *    { INNER | CROSS | FULL [OUTER] | LEFT [OUTER] | RIGHT [OUTER] }
   */
  $.RULE('join', () => {
    $.OPTION1(() => $.CONSUME(TOKENS.JoinType));
    $.CONSUME(TOKENS.Join);
    $.SUBRULE($.fromItem);
    $.OPTION2(() => {
      $.OR([
        { ALT: () => $.SUBRULE($.joinOn) },
        { ALT: () => $.SUBRULE($.joinUsing) }
      ]);
    });
  });

  $.RULE('joinOn', () => {
    $.CONSUME(TOKENS.On);
    $.SUBRULE($.boolExpression);
  });

  $.RULE('joinUsing', () => {
    $.CONSUME(TOKENS.Using);
    $.CONSUME(TOKENS.LeftParenthesis);
    $.SUBRULE($.joinColumns);
    $.CONSUME(TOKENS.RightParenthesis);
  });

  $.RULE('joinColumns', () => {
    $.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => $.SUBRULE($.identifier)
    });
  });
};
