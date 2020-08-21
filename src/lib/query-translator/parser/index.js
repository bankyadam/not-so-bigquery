const { CstParser } = require('chevrotain');
const TOKENS = require('../tokens');

class SelectParser extends CstParser {
  constructor() {
    super(TOKENS);

    const $ = this;

    // query_statement:
    //     query_expr
    //
    // query_expr:
    //     [ WITH with_query_name AS ( query_expr ) [, ...] ]
    //     { select | ( query_expr ) | query_expr set_op query_expr }
    //     [ ORDER BY expression [{ ASC | DESC }] [, ...] ]
    //     [ LIMIT count [ OFFSET skip_rows ] ]
    //
    // select:
    //     SELECT [ AS { STRUCT | VALUE } ] [{ ALL | DISTINCT }]
    //         { [ expression. ]* [ EXCEPT ( column_name [, ...] ) ]
    //             [ REPLACE ( expression [ AS ] column_name [, ...] ) ]
    //         | expression [ [ AS ] alias ] } [, ...]
    //     [ FROM from_item  [, ...] ]
    //     [ WHERE bool_expression ]
    //     [ GROUP BY { expression [, ...] | ROLLUP ( expression [, ...] ) } ]
    //     [ HAVING bool_expression ]
    //     [ WINDOW named_window_expression AS { named_window | ( [ window_definition ] ) } [, ...] ]
    //
    // set_op:
    //     UNION { ALL | DISTINCT } | INTERSECT DISTINCT | EXCEPT DISTINCT
    //
    // from_item: {
    //     table_name [ [ AS ] alias ] [ FOR SYSTEM_TIME AS OF timestamp_expression ]  |
    //     join |
    //     ( query_expr ) [ [ AS ] alias ] |
    //     field_path |
    //     { UNNEST( array_expression ) | UNNEST( array_path ) | array_path }
    //         [ [ AS ] alias ] [ WITH OFFSET [ [ AS ] alias ] ] |
    //     with_query_name [ [ AS ] alias ]
    // }
    //
    // join:
    //     from_item [ join_type ] JOIN from_item
    //     [ { ON bool_expression | USING ( join_column [, ...] ) } ]
    //
    // join_type:
    //     { INNER | CROSS | FULL [OUTER] | LEFT [OUTER] | RIGHT [OUTER] }

    $.RULE('selectStatement', () => {
      $.SUBRULE($.queryExpression);
    });

    $.RULE('queryExpression', () => {
      $.SUBRULE($.select);
      $.OPTION1(() => {
        $.SUBRULE1($.fromClause);
      });
      $.OPTION4(() => {
        $.SUBRULE4($.groupByClause);
      });
      $.OPTION2(() => {
        $.SUBRULE2($.orderByClause);
      });
      $.OPTION3(() => {
        $.SUBRULE3($.limitClause);
      });
    });

    require('./rules/select')($);
    require('./rules/from_clause')($);
    require('./rules/group_by_clause')($);
    require('./rules/order_by_clause')($);
    require('./rules/limit_clause')($);

    // COMMON RULES

    $.RULE('expression', () => {
      $.CONSUME(TOKENS.Identifier);
    });

    this.performSelfAnalysis();
  }
}

module.exports = new SelectParser();
