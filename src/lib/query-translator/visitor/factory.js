'use strict';

const { hexToDec } = require('hex2dec');

const {
  BIGQUERY_TYPES,
  BIGQUERY_DATE_PARTS,
  BIGQUERY_DATE_TYPES
} = require('../../bigQuery/types');
const FUNCTION_HANDLERS = require('../functions');
const reservedWords = require('../../bigQuery/reserved_words.json');

module.exports = (parser) => {
  const BaseCstVisitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

  class Visitor extends BaseCstVisitorWithDefaults {
    constructor() {
      super();

      this._currentLevel = -1;
      this._aliases = [];

      this.validateVisitor();
    }

    _increaseLevel() {
      this._currentLevel++;
      this._aliases[this._currentLevel] = [];
    }

    _decreaseLevel() {
      delete this._aliases[this._currentLevel];
      this._currentLevel--;
    }

    _addAlias(aliasName) {
      this._aliases[this._currentLevel].push(aliasName);
    }

    _isAliasExists(aliasName) {
      return this._aliases[this._currentLevel].indexOf(aliasName) !== -1;
    }

    selectStatement(ctx) {
      return this.visit(ctx.queryExpression);
    }

    queryExpression(ctx) {
      this._increaseLevel();
      const parts = [];
      if (ctx.withClause) {
        parts.push(this.visit(ctx.withClause));
      }
      if (ctx.select) {
        parts.push(this.visit(ctx.select));
      }
      if (ctx.bracketedQueryExpression) {
        parts.push(this.visit(ctx.bracketedQueryExpression));
      }
      if (ctx.orderByClause) {
        parts.push(this.visit(ctx.orderByClause));
      }
      if (ctx.limitClause) {
        parts.push(this.visit(ctx.limitClause));
      }
      if (ctx.SetOperator) {
        parts.push(ctx.SetOperator[0].image);
        parts.push(this.visit(ctx.rightSide));
      }
      this._decreaseLevel();
      return parts.join(' ');
    }

    bracketedQueryExpression(ctx) {
      return [
        '(',
        this.visit(ctx.queryExpression),
        ')'
      ].join('');
    }

    select(ctx) {
      const statementParts = ['SELECT'];
      if (ctx.selectModifier) {
        statementParts.push(this.visit(ctx.selectModifier));
      }
      statementParts.push(this.visit(ctx.selectList));
      if (ctx.fromClause) {
        statementParts.push(this.visit(ctx.fromClause));
      }
      if (ctx.whereClause) {
        statementParts.push(this.visit(ctx.whereClause));
      }
      if (ctx.groupByClause) {
        statementParts.push(this.visit(ctx.groupByClause));
      }
      if (ctx.havingClause) {
        statementParts.push(this.visit(ctx.havingClause));
      }
      return statementParts.join(' ');
    }

    selectModifier(ctx) {
      if (ctx.SelectDistinct) {
        return 'DISTINCT';
      } else if (ctx.SelectAll) {
        return 'ALL';
      }
    }

    selectList(ctx) {
      const expressions = ctx.resultColumn.map(token => this.visit(token));
      return expressions.join(', ');
    }

    resultColumn(ctx) {
      const parts = [];
      if (ctx.expression) {
        parts.push(this.visit(ctx.expression));
        if (ctx.asAlias) {
          parts.push(this.visit(ctx.asAlias));
        }
      } else if (ctx.Asterisk) {
        parts.push('*');
      }
      return parts.join(' ');
    }

    fromClause(ctx) {
      const fromItems = ctx.fromItem.map(token => this.visit(token));
      return `FROM ${fromItems.join(', ')}`;
    }

    fromItem(ctx) {
      const parts = [];
      if (ctx.tableName) {
        parts.push(this.visit(ctx.tableName));
      } else if (ctx.subQuery) {
        parts.push(this.visit(ctx.subQuery));
      } else if (ctx.unnest) {
        parts.push(this.visit(ctx.unnest));
      }
      if (ctx.join) {
        ctx.join.forEach(token => {
          parts.push(this.visit(token));
        });
      }
      return parts.join(' ');
    }

    join(ctx) {
      const parts = [];
      if (ctx.JoinType) {
        parts.push(ctx.JoinType[0].image);
      }
      parts.push('JOIN');
      parts.push(this.visit(ctx.fromItem));
      if (ctx.joinOn) {
        parts.push(this.visit(ctx.joinOn));
      } else if (ctx.joinUsing) {
        parts.push(this.visit(ctx.joinUsing));
      }
      return parts.join(' ');
    }

    joinOn(ctx) {
      return [
        'ON',
        this.visit(ctx.expression)
      ].join(' ');
    }

    joinUsing(ctx) {
      return [
        'USING',
        '(',
        this.visit(ctx.joinColumns),
        ')'
      ].join(' ');
    }

    joinColumns(ctx) {
      const columns = ctx.identifier.map(token => this.visit(token));
      return columns.join(', ');
    }

    tableName(ctx) {
      const parts = [this.visit(ctx.tableIdentifier)];
      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias, true));
      }
      return parts.join(' ');
    }

    tableIdentifier(ctx) {
      switch (ctx.Identifier.length) {
        case 3: {
          const project = ctx.Identifier[0].image;
          const dataset = ctx.Identifier[1].image;
          const table = ctx.Identifier[2].image;
          return `"${project}__${dataset}"."${table}"`;
        }

        case 2: {
          const dataset = ctx.Identifier[0].image;
          const table = ctx.Identifier[1].image;
          if (this._isAliasExists(dataset)) {
            return `"${dataset}"."${table}"`;
          }
          return `"${this.defaultProjectId}__${dataset}"."${table}"`;
        }

        case 1:
        default:
          return `"${ctx.Identifier[0].image}"`;
      }
    }

    subQuery(ctx) {
      const parts = ['(', this.visit(ctx.queryExpression), ')'];
      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias));
      }
      return parts.join(' ');
    }

    unnest(ctx) {
      const parts = ['UNNEST(', this.visit(ctx.array), ')'];
      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias));
      }
      return parts.join(' ');
    }

    whereClause(ctx) {
      return [
        'WHERE',
        this.visit(ctx.expression)
      ].join(' ');
    }

    orderByClause(ctx) {
      const expressions = ctx.orderByItem.map(token => this.visit(token));
      return [
        'ORDER BY',
        expressions.join(', ')
      ].join(' ');
    }

    orderByItem(ctx) {
      const parts = [this.visit(ctx.expression)];
      if (ctx.OrderByAsc) {
        parts.push('ASC');
      } else if (ctx.OrderByDesc) {
        parts.push('DESC');
      }
      if (ctx.OrderByNullsLast) {
        parts.push('NULLS LAST');
      } else {
        parts.push('NULLS FIRST');
      }
      return parts.join(' ');
    }

    limitClause(ctx) {
      const parts = [
        ctx.Limit[0].image,
        ctx.Numeric[0].image
      ];
      if (ctx.Offset) {
        parts.push(ctx.Offset[0].image);
      }
      return parts.join(' ');
    }

    groupByClause(ctx) {
      const expressions = ctx.groupByExpression.map(token => this.visit(token));
      return [
        'GROUP BY',
        expressions.join(', ')
      ].join(' ');
    }

    groupByExpression(ctx) {
      if (ctx.Numeric) { return ctx.Numeric[0].image; }
      if (ctx.identifier) { return this.visit(ctx.identifier[0]); }
    }

    havingClause(ctx) {
      return [
        'HAVING',
        this.visit(ctx.expression)
      ].join(' ');
    }

    withClause(ctx) {
      const parts = ctx.withItem.map(token => this.visit(token));
      return [
        'WITH',
        parts.join(', ')
      ].join(' ');
    }

    withItem(ctx) {
      return [
        `"${ctx.with_query_name[0].image}"`,
        'AS',
        '(',
        this.visit(ctx.queryExpression),
        ')'
      ].join(' ');
    }

    asAlias(ctx, addAlias) {
      if (addAlias) {
        this._addAlias(ctx.alias[0].image);
      }
      return [
        'AS',
        `"${ctx.alias[0].image}"`
      ].join(' ');
    }

    expression(ctx) {
      const parts = [this.visit(ctx.atomicExpression)];

      if (ctx.betweenExpression) {
        parts.push(this.visit(ctx.betweenExpression));
      } else if (ctx.inExpression) {
        parts.push(this.visit(ctx.inExpression));
      }

      if (ctx.binaryOperatorExpression) {
        parts.push(this.visit(ctx.binaryOperatorExpression));
      }

      return parts.join(' ');
    }

    atomicExpression(ctx) {
      if (ctx.literalValue) {
        return this.visit(ctx.literalValue);
      } else if (ctx.array) {
        return this.visit(ctx.array);
      } else if (ctx.function) {
        return this.visit(ctx.function);
      } else if (ctx.typelessStruct) {
        return this.visit(ctx.typelessStruct);
      } else if (ctx.identifier) {
        return this.visit(ctx.identifier);
      } else if (ctx.unaryOperatorExpression) {
        return this.visit(ctx.unaryOperatorExpression);
      } else if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression);
      } else if (ctx.cast) {
        return this.visit(ctx.cast);
      } else if (ctx.extract) {
        return this.visit(ctx.extract);
      } else if (ctx.namedQueryParameter) {
        return this.visit(ctx.namedQueryParameter);
      } else if (ctx.queryExpression) {
        return ['(', this.visit(ctx.queryExpression), ')'].join('');
      } else if (ctx.dateExpression) {
        return this.visit(ctx.dateExpression);
      } else if (ctx.intervalExpression) {
        return this.visit(ctx.intervalExpression);
      }
    }

    literalValue(ctx) {
      if (ctx.Numeric) {
        return ctx.Numeric[0].image;
      } else if (ctx.NumericHex) {
        return hexToDec(ctx.NumericHex[0].image);
      } else if (ctx.String) {
        return this._convertString(ctx.String[0].image);
      } else if (ctx.LiteralConstant) {
        return ctx.LiteralConstant[0].image;
      }
    }

    _convertString(string) {
      if (string[0] === "'") { return string; }
      if (string.indexOf('"""') === 0) {
        return string.replace(/^"""|"""$/g, "'''");
      }
      return [
        "'",
        string
          .replace(/^"|"$/g, '')
          .replace(/\\"/g, '"')
          .replace(/'/g, "\\'"),
        "'"
      ].join('');
    }

    array(ctx) {
      if (ctx.literalValue) {
        return ['ARRAY[', ctx.literalValue.map(token => this.visit(token)).join(','), ']'].join('');
      }

      return 'ARRAY[]::INT8[]';
    }

    identifier(ctx) {
      return ctx.AnyWord.map(token => this._anyWord(token)).join('.');
    }

    _anyWord(token) {
      if (reservedWords.includes(token.image.toUpperCase())) {
        return token.image;
      }
      return `"${token.image}"`;
    }

    ['function'](ctx) {
      if (FUNCTION_HANDLERS[ctx.functionName[0].image.toUpperCase()]) {
        return FUNCTION_HANDLERS[ctx.functionName[0].image.toUpperCase()].call(this, ctx);
      }

      let parameters = [];

      if (ctx.expression) {
        parameters = ctx.expression.map(token => this.visit(token));
      } else if (ctx.Asterisk) {
        parameters = ['*'];
      }

      const parts = [
        ctx.functionName[0].image,
        '(',
        ctx.SelectDistinct ? 'DISTINCT' : '',
        parameters.join(',')
      ];

      if (ctx.orderByClause) {
        parts.push(this.visit(ctx.orderByClause[0]));
      }
      if (ctx.limitClause) {
        parts.push(this.visit(ctx.limitClause[0]));
      }

      parts.push(')');

      if (ctx.windowSpecification) {
        parts.push(this.visit(ctx.windowSpecification));
      }

      return parts.join(' ');
    }

    namedQueryParameter(ctx) {
      return [
        '@',
        ctx.AnyWord[0].image
      ].join('');
    }

    unaryOperatorExpression(ctx) {
      return [
        'NOT',
        this.visit(ctx.expression)
      ].join(' ');
    }

    parenthesisExpression(ctx) {
      return [
        '(',
        ctx.expression.map(token => this.visit(token)).join(', '),
        ')'
      ].join('');
    }

    dateExpression(ctx) {
      return [
        BIGQUERY_DATE_TYPES[ctx.dateType[0].image.toUpperCase()],
        this._convertString(ctx.String[0].image)
      ].join(' ');
    }

    intervalExpression(ctx) {
      return [
        'INTERVAL',
        ctx.atomicExpression[0].children.hasOwnProperty('literalValue') ?
          ["'", this.visit(ctx.atomicExpression), "'"].join('') :
          this.visit(ctx.atomicExpression),
        ctx.datePart[0].image.toUpperCase()
      ].join(' ');
    }

    cast(ctx) {
      return [
        'CAST',
        '(',
        this.visit(ctx.expression[0]),
        'AS',
        BIGQUERY_TYPES[ctx.Identifier[0].image.toUpperCase()],
        ')'
      ].join(' ');
    }

    extract(ctx) {
      return [
        'EXTRACT',
        '(',
        BIGQUERY_DATE_PARTS[ctx.Identifier[0].image],
        'FROM',
        this.visit(ctx.expression[0]),
        ')'
      ].join(' ');
    }

    binaryOperatorExpression(ctx) {
      return [
        this.visit(ctx.binaryOperator),
        this.visit(ctx.rhs)
      ].join(' ');
    }

    betweenExpression(ctx) {
      const parts = [
        'BETWEEN',
        this.visit(ctx.rhs_min),
        'AND',
        this.visit(ctx.rhs_max)
      ];
      if (ctx.Not) {
        parts.unshift('NOT');
      }
      return parts.join(' ');
    }

    inExpression(ctx) {
      const parts = [
        'IN',
        this.visit(ctx.expression)
      ];
      if (ctx.Not) {
        parts.unshift('NOT');
      }
      return parts.join(' ');
    }

    binaryOperator(ctx) {
      if (ctx.OperatorBinary) {
        return ctx.OperatorBinary[0].image;
      } else if (ctx.And) {
        return 'AND';
      }
    }

    typelessStruct(ctx) {
      const parts = [
        'STRUCT',
        '(',
        ')'];

      if (ctx.structItem) {
        parts.splice(-1, 0, ctx.structItem.map(token => this.visit(token)).join(', '));
      }

      return parts.join(' ');
    }

    structItem(ctx) {
      const parts = [
        this.visit(ctx.atomicExpression)
      ];

      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias));
      }

      return parts.join(' ');
    }

    windowSpecification(ctx) {
      const parts = ['OVER', '('];

      if (ctx.partitionBy) {
        parts.push(this.visit(ctx.partitionBy));
      }

      if (ctx.orderByClause) {
        parts.push(this.visit(ctx.orderByClause));
      }

      if (ctx.frameClause) {
        parts.push(this.visit(ctx.frameClause));
      }

      parts.push(')');


      return parts.join(' ');
    }

    partitionBy(ctx) {
      return [
        'PARTITION BY',
        ctx.atomicExpression.map(atomicExpression => this.visit(atomicExpression)).join(', ')
      ].join(' ');
    }

    frameClause(ctx) {
      const parts = [ctx.RowsRange[0].image];

      if (ctx.frame) {
        parts.push(this.visit(ctx.frame));
      }

      if (ctx.frameBetween) {
        parts.push(this.visit(ctx.frameBetween));
      }

      return parts.join(' ');
    }

    frameBetween(ctx) {
      return [
        ctx.Between[0].image,
        this.visit(ctx.frameBegin),
        ctx.And[0].image,
        this.visit(ctx.frameEnd)
      ].join(' ');
    }

    frame(ctx) {
      if (ctx.numericPreceding) {
        return this.visit(ctx.numericPreceding);
      }

      if (ctx.unboundedPreceding) {
        return this.visit(ctx.unboundedPreceding);

      }

      if (ctx.CurrentRow) {
        return ctx.CurrentRow[0].image;
      }

      if (ctx.numericFollowing) {
        return this.visit(ctx.numericFollowing);
      }

      if (ctx.unboundedFollowing) {
        return this.visit(ctx.unboundedFollowing);
      }
    }

    numericPreceding(ctx) {
      return [
        ctx.Numeric[0].image,
        ctx.Preceding[0].image
      ].join(' ');
    }

    unboundedPreceding(ctx) {
      return [
        ctx.Unbounded[0].image,
        ctx.Preceding[0].image
      ].join(' ');
    }

    numericFollowing(ctx) {
      return [
        ctx.Numeric[0].image,
        ctx.Following[0].image
      ].join(' ');
    }

    unboundedFollowing(ctx) {
      return [
        ctx.Unbounded[0].image,
        ctx.Following[0].image
      ].join(' ');
    }
  }

  return new Visitor;
};
