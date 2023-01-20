/* eslint-disable new-cap */
import { CstParser } from 'chevrotain';
import TOKENS from '../tokens';

class SelectParser extends CstParser {
  constructor() {
    super(TOKENS);
    this.performSelfAnalysis();
  }

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
  public selectStatement = this.RULE('selectStatement', () => {
    this.SUBRULE(this.queryExpression);
    this.OPTION(() => this.CONSUME(TOKENS.Semicolon));
  });

  // BEGIN: queryExpression
  private queryExpression = this.RULE('queryExpression', () => {
    this.OPTION1(() => {
      this.SUBRULE1(this.withClause);
    });
    this.OR([
      { ALT: () => this.SUBRULE(this.select) },
      { ALT: () => this.SUBRULE(this.bracketedQueryExpression) }
    ]);
    this.OPTION2(() => {
      this.SUBRULE2(this.orderByClause);
    });
    this.OPTION3(() => {
      this.SUBRULE3(this.limitClause);
    });
    this.OPTION4(() => {
      this.CONSUME(TOKENS.SetOperator);
      this.SUBRULE(this.queryExpression, { LABEL: 'rightSide' });
    });
  });

  private bracketedQueryExpression = this.RULE('bracketedQueryExpression', () => {
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.queryExpression);
    this.CONSUME(TOKENS.RightParenthesis);
  });
  // END: queryExpression

  // BEGIN: withClause
  private withClause = this.RULE('withClause', () => {
    this.CONSUME(TOKENS.With);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => {
        this.SUBRULE(this.withItem);
      }
    });
  });

  private withItem = this.RULE('withItem', () => {
    this.CONSUME(TOKENS.Identifier, { LABEL: 'with_query_name' });
    this.CONSUME(TOKENS.As);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.queryExpression);
    this.CONSUME(TOKENS.RightParenthesis);
  });
  // END: withClause

  // BEGIN: select
  private select = this.RULE('select', () => {
    this.CONSUME(TOKENS.Select);
    this.OPTION1(() => this.SUBRULE(this.selectModifier));
    this.SUBRULE(this.selectList);
    this.OPTION2(() => this.SUBRULE(this.fromClause));
    this.OPTION4(() => this.SUBRULE(this.whereClause));
    this.OPTION3(() => this.SUBRULE(this.groupByClause));
    this.OPTION5(() => this.SUBRULE(this.havingClause));
  });

  private selectModifier = this.RULE('selectModifier', () => {
    this.OR([
      { ALT: () => this.CONSUME(TOKENS.SelectDistinct) },
      { ALT: () => this.CONSUME(TOKENS.SelectAll) }
    ]);
  });

  private selectList = this.RULE('selectList', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.resultColumn)
    });
  });

  private resultColumn = this.RULE('resultColumn', () => {
    this.OR([
      {
        ALT: () => {
          this.SUBRULE(this.expression);
          this.OPTION(() => this.SUBRULE(this.asAlias));
        }
      },
      { ALT: () => this.CONSUME1(TOKENS.Asterisk) }
    ]);
  });
  // END: select

  // BEGIN: fromClause
  private fromClause = this.RULE('fromClause', () => {
    this.CONSUME(TOKENS.From);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.fromItem)
    });
  });
  // END: fromClause

  // BEGIN: fromItem
  private fromItem = this.RULE('fromItem', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.tableName) },
      { ALT: () => this.SUBRULE(this.subQuery) },
      { ALT: () => this.SUBRULE(this.unnest) }
    ]);
    this.OPTION(() => this.MANY(() => this.SUBRULE(this.join)));
  });

  private tableName = this.RULE('tableName', () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME1(TOKENS.Backtick);
          this.SUBRULE1(this.tableIdentifier);
          this.CONSUME2(TOKENS.Backtick);
        }
      },
      { ALT: () => this.SUBRULE2(this.tableIdentifier) }
    ]);
    this.OPTION3(() => this.SUBRULE3(this.asAlias));
  });

  private tableIdentifier = this.RULE('tableIdentifier', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => this.CONSUME(TOKENS.Identifier)
    });
  });

  /**
   *     {
   *        UNNEST(array_expression) |
   *        #> UNNEST(array_path) | <#
   *        #> array_path <#
   *     }
   *     [[AS] alias]
   *     #> [ WITH OFFSET [[AS] alias] ] <#
   */
  private unnest = this.RULE('unnest', () => {
    this.CONSUME(TOKENS.Unnest);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.array);
    this.CONSUME(TOKENS.RightParenthesis);
    this.OPTION1(() => {
      this.SUBRULE(this.asAlias);
    });
  });

  /**
   *     ( query_expr ) [ [ AS ] alias ] |
   */
  private subQuery = this.RULE('subQuery', () => {
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.queryExpression);
    this.CONSUME(TOKENS.RightParenthesis);
    this.OPTION(() => {
      this.SUBRULE(this.asAlias);
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
  private join = this.RULE('join', () => {
    this.OPTION1(() => this.CONSUME(TOKENS.JoinType));
    this.CONSUME(TOKENS.Join);
    this.SUBRULE(this.fromItem);
    this.OPTION2(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.joinOn) },
        { ALT: () => this.SUBRULE(this.joinUsing) }
      ]);
    });
  });

  private joinOn = this.RULE('joinOn', () => {
    this.CONSUME(TOKENS.On);
    this.SUBRULE(this.expression);
  });

  private joinUsing = this.RULE('joinUsing', () => {
    this.CONSUME(TOKENS.Using);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.joinColumns);
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private joinColumns = this.RULE('joinColumns', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.identifier)
    });
  });

  // END: fromItem

  // BEGIN: whereClause
  private whereClause = this.RULE('whereClause', () => {
    this.CONSUME(TOKENS.Where);
    this.SUBRULE(this.expression);
  });
  // END: whereClause

  // BEGIN: groupByClause
  private groupByClause = this.RULE('groupByClause', () => {
    this.CONSUME(TOKENS.GroupBy);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.groupByExpression)
    });
  });

  private groupByExpression = this.RULE('groupByExpression', () => {
    this.OR([
      { ALT: () => this.CONSUME(TOKENS.Numeric) },
      { ALT: () => this.SUBRULE(this.identifier) }
    ]);
  });

  // END: groupByClause

  // BEGIN: havingClause
  private havingClause = this.RULE('havingClause', () => {
    this.CONSUME(TOKENS.Having);
    this.SUBRULE(this.expression);
  });

  // END: havingClause

  // BEGIN: orderByClause
  private orderByClause = this.RULE('orderByClause', () => {
    this.CONSUME(TOKENS.OrderBy);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => {
        this.SUBRULE(this.orderByItem);
      }
    });
  });

  private orderByItem = this.RULE('orderByItem', () => {
    this.SUBRULE(this.expression);
    this.OPTION1(() => {
      this.OR1([
        { ALT: () => this.CONSUME(TOKENS.OrderByAsc) },
        { ALT: () => this.CONSUME(TOKENS.OrderByDesc) }
      ]);
    });
    this.OPTION2(() => {
      this.OR2([
        { ALT: () => this.CONSUME(TOKENS.OrderByNullsFirst) },
        { ALT: () => this.CONSUME(TOKENS.OrderByNullsLast) }
      ]);
    });
  });

  // END: orderByClause

  // BEGIN: limitClause
  private limitClause = this.RULE('limitClause', () => {
    this.CONSUME(TOKENS.Limit);
    this.CONSUME(TOKENS.Numeric);
    this.OPTION(() => this.CONSUME(TOKENS.Offset));
  });
  // END: limitClause

  // COMMON RULES
  private asAlias = this.RULE('asAlias', () => {
    this.OPTION(() => this.CONSUME(TOKENS.As));
    this.CONSUME(TOKENS.Identifier, { LABEL: 'alias' });
  });

  // BEGIN: expression
  private expression = this.RULE('expression', () => {
    this.SUBRULE(this.atomicExpression);
    this.OPTION1(() => this.OR([
      { ALT: () => this.SUBRULE(this.betweenExpression) },
      { ALT: () => this.SUBRULE(this.inExpression) }
    ]));
    this.OPTION2(() => this.SUBRULE(this.binaryOperatorExpression));
  });

  private atomicExpression = this.RULE('atomicExpression', () => {
    this.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => this.SUBRULE(this.unaryOperatorExpression) },
        { ALT: () => this.SUBRULE(this.parenthesisExpression) },
        { ALT: () => this.SUBRULE(this.dateExpression) },
        { ALT: () => this.SUBRULE(this.intervalExpression) },
        { ALT: () => this.SUBRULE(this.typelessStruct) },
        { ALT: () => this.SUBRULE(this.case) },
        { ALT: () => this.SUBRULE(this.cast) },
        { ALT: () => this.SUBRULE(this.extract) },
        { ALT: () => this.SUBRULE(this.function) },
        { ALT: () => this.SUBRULE(this.literalValue) },
        { ALT: () => this.SUBRULE(this.identifier) },
        { ALT: () => this.SUBRULE(this.namedQueryParameter) },
        { ALT: () => this.SUBRULE(this.array) },
        {
          ALT: () => {
            this.CONSUME2(TOKENS.LeftParenthesis);
            this.SUBRULE2(this.queryExpression);
            this.CONSUME2(TOKENS.RightParenthesis);
          }
        }
      ]
    });
  });

  private unaryOperatorExpression = this.RULE('unaryOperatorExpression', () => {
    this.CONSUME(TOKENS.Not);
    this.SUBRULE(this.expression);
  });

  private binaryOperatorExpression = this.RULE('binaryOperatorExpression', () => {
    this.SUBRULE(this.binaryOperator);
    this.SUBRULE2(this.expression, { LABEL: 'rhs' });
  });

  private binaryOperator = this.RULE('binaryOperator', () => {
    this.OR([
      { ALT: () => this.CONSUME(TOKENS.OperatorBinary) },
      { ALT: () => this.CONSUME(TOKENS.And) }
    ]);
  });

  private parenthesisExpression = this.RULE('parenthesisExpression', () => {
    this.CONSUME(TOKENS.LeftParenthesis);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.expression)
    });
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private dateExpression = this.RULE('dateExpression', () => {
    this.CONSUME(TOKENS.Identifier, { LABEL: 'dateType' });
    this.CONSUME(TOKENS.String);
  });

  private intervalExpression = this.RULE('intervalExpression', () => {
    this.CONSUME(TOKENS.Interval);
    this.SUBRULE(this.atomicExpression);
    this.CONSUME(TOKENS.Identifier, { LABEL: 'datePart' });
  });

  private literalValue = this.RULE('literalValue', () => {
    this.OR([
      { ALT: () => this.CONSUME(TOKENS.LiteralConstant) },
      { ALT: () => this.CONSUME(TOKENS.Numeric) },
      { ALT: () => this.CONSUME(TOKENS.NumericHex) },
      { ALT: () => this.CONSUME(TOKENS.String) }
    ]);
  });

  private array = this.RULE('array', () => {
    this.CONSUME(TOKENS.LeftSquareBracket);
    this.MANY_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.literalValue)
    });
    this.CONSUME(TOKENS.RightSquareBracket);
  });

  private function = this.RULE('function', () => {
    this.CONSUME(TOKENS.Identifier, { LABEL: 'functionName' });
    this.CONSUME(TOKENS.LeftParenthesis);
    this.OPTION1(() => {
      this.OPTION2(() => {
        this.CONSUME(TOKENS.SelectDistinct);
      });
      this.OR([
        {
          ALT: () =>
            this.AT_LEAST_ONE_SEP({
              SEP: TOKENS.Comma,
              DEF: () => this.SUBRULE(this.expression)
            })
        },
        { ALT: () => this.CONSUME(TOKENS.Asterisk) }
      ]);
      this.OPTION3(() => this.CONSUME(TOKENS.IgnoreRespectNulls));
      this.OPTION4(() => this.SUBRULE(this.orderByClause));
      this.OPTION5(() => this.SUBRULE(this.limitClause));
    });
    this.CONSUME(TOKENS.RightParenthesis);
    this.OPTION6(() => this.SUBRULE(this.windowSpecification));
  });

  private identifier = this.RULE('identifier', () => {
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.IdentifierQualifier,
      DEF: () => this.CONSUME(TOKENS.AnyWord)
    });
    this.OPTION(() => {
      this.CONSUME(TOKENS.IdentifierQualifier);
      this.CONSUME(TOKENS.Asterisk);
    });
  });

  private namedQueryParameter = this.RULE('namedQueryParameter', () => {
    this.CONSUME(TOKENS.AtCharacter);
    this.CONSUME(TOKENS.AnyWord);
  });

  private cast = this.RULE('cast', () => {
    this.CONSUME(TOKENS.Cast);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.SUBRULE(this.expression);
    this.CONSUME(TOKENS.As);
    this.CONSUME(TOKENS.Identifier);
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private extract = this.RULE('extract', () => {
    this.CONSUME(TOKENS.Extract);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.CONSUME1(TOKENS.Identifier);
    this.CONSUME(TOKENS.From);
    this.SUBRULE(this.expression);
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private inExpression = this.RULE('inExpression', () => {
    this.OPTION(() => this.CONSUME(TOKENS.Not));
    this.CONSUME(TOKENS.In);
    this.SUBRULE(this.expression);
  });

  private betweenExpression = this.RULE('betweenExpression', () => {
    this.OPTION(() => this.CONSUME(TOKENS.Not));
    this.CONSUME(TOKENS.Between);
    this.SUBRULE2(this.atomicExpression, { LABEL: 'rhs_min' });
    this.CONSUME(TOKENS.And);
    this.SUBRULE3(this.atomicExpression, { LABEL: 'rhs_max' });
  });

  private typelessStruct = this.RULE('typelessStruct', () => {
    this.CONSUME(TOKENS.Struct);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.MANY_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.structItem)
    });
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private structItem = this.RULE('structItem', () => {
    this.SUBRULE(this.atomicExpression);
    this.OPTION(() => this.SUBRULE(this.asAlias));
  });

  private case = this.RULE('case', () => {
    this.CONSUME(TOKENS.Case);
    this.AT_LEAST_ONE(() => {
      this.SUBRULE(this.caseWhenExpression);
    });
    this.OPTION(() => {
      this.CONSUME(TOKENS.Else);
      this.SUBRULE(this.atomicExpression, { LABEL: 'result' });
    });//, { LABEL: 'caseElseExpression' });
    this.CONSUME(TOKENS.End);
  });

  private caseWhenExpression = this.RULE('caseWhenExpression', () => {
    this.CONSUME(TOKENS.When);
    this.SUBRULE(this.expression);
    this.CONSUME(TOKENS.Then);
    this.SUBRULE(this.atomicExpression, { LABEL: 'result' });
  });
  // END: expression

  // BEGIN: windowSpecification
  private windowSpecification = this.RULE('windowSpecification', () => {
    this.CONSUME(TOKENS.Over);
    this.CONSUME(TOKENS.LeftParenthesis);
    this.OPTION1(() => {
      this.SUBRULE(this.partitionBy);
    });
    this.OPTION2(() => {
      this.SUBRULE(this.orderByClause);
    });
    this.OPTION3(() => {
      this.SUBRULE(this.frameClause);
    });
    this.CONSUME(TOKENS.RightParenthesis);
  });

  private partitionBy = this.RULE('partitionBy', () => {
    this.CONSUME(TOKENS.PartitionBy);
    this.AT_LEAST_ONE_SEP({
      SEP: TOKENS.Comma,
      DEF: () => this.SUBRULE(this.atomicExpression)
    });
  });

  private frameClause = this.RULE('frameClause', () => {
    this.CONSUME(TOKENS.RowsRange);
    this.OR({
      IGNORE_AMBIGUITIES: true,
      DEF: [
        { ALT: () => this.SUBRULE(this.frame) },
        { ALT: () => this.SUBRULE(this.frameBetween) }
      ]
    });
  });

  private frameBetween = this.RULE('frameBetween', () => {
    this.CONSUME(TOKENS.Between);
    this.SUBRULE1(this.frame, { LABEL: 'frameBegin' });
    this.CONSUME(TOKENS.And);
    this.SUBRULE2(this.frame, { LABEL: 'frameEnd' });
  });

  private frame = this.RULE('frame', () => {
    this.OR({
      DEF: [
        { ALT: () => this.SUBRULE(this.numericPreceding) },
        { ALT: () => this.SUBRULE(this.unboundedPreceding) },
        { ALT: () => this.CONSUME(TOKENS.CurrentRow) },
        { ALT: () => this.SUBRULE(this.numericFollowing) },
        { ALT: () => this.SUBRULE(this.unboundedFollowing) }
      ]
    });
  });

  private unboundedPreceding = this.RULE('unboundedPreceding', () => {
    this.CONSUME(TOKENS.Unbounded);
    this.CONSUME(TOKENS.Preceding);
  });

  private numericPreceding = this.RULE('numericPreceding', () => {
    this.CONSUME(TOKENS.Numeric);
    this.CONSUME(TOKENS.Preceding);
  });

  private unboundedFollowing = this.RULE('unboundedFollowing', () => {
    this.CONSUME(TOKENS.Unbounded);
    this.CONSUME(TOKENS.Following);
  });

  private numericFollowing = this.RULE('numericFollowing', () => {
    this.CONSUME(TOKENS.Numeric);
    this.CONSUME(TOKENS.Following);
  });
  // END: windowSpecification
}

export default new SelectParser();
