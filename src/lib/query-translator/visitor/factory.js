'use strict';

const { zip } = require('lodash');

module.exports = (parser) => {
  const BaseCstVisitorWithDefaults = parser.getBaseCstVisitorConstructorWithDefaults();

  class Visitor extends BaseCstVisitorWithDefaults {
    constructor() {
      super();
      this.validateVisitor();
    }

    selectStatement(ctx) {
      return this.visit(ctx.queryExpression);
    }

    queryExpression(ctx) {
      let statementParts = [];

      if (ctx.withClause) {
        statementParts.push(this.visit(ctx.withClause));
      }

      if (ctx.select) {
        statementParts.push(this.visit(ctx.select));
      }
      if (ctx.orderByClause) {
        statementParts.push(this.visit(ctx.orderByClause));
      }
      if (ctx.limitClause) {
        statementParts.push(this.visit(ctx.limitClause));
      }
      return statementParts.join(' ');
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
      const expressions = ctx.selectExpression.map(token => this.visit(token));
      return expressions.join(', ');
    }

    selectExpression(ctx) {
      return this.visit(ctx.expression);
    }

    fromClause(ctx) {
      const fromItems = ctx.fromItem.map(token => this.visit(token));
      return `FROM ${fromItems.join(', ')}`;
    }

    fromItem(ctx) {
      if (ctx.tableName) {
        return this.visit(ctx.tableName);
      } else if (ctx.subQuery) {
        return this.visit(ctx.subQuery);
      }
    }

    tableName(ctx) {
      const tableNameParts = [this.visit(ctx.tableIdentifier)];
      if (ctx.asAlias) {
        tableNameParts.push(this.visit(ctx.asAlias));
      }

      return tableNameParts.join(' ');
    }

    tableIdentifier(ctx) {
      switch (ctx.Identifier.length) {
        case 3:
          return `${(ctx.Identifier[0].image)}__${(ctx.Identifier[1].image)}.${(ctx.Identifier[2].image)}`;

        case 2:
          return `${(this.defaultProjectId)}__${(ctx.Identifier[0].image)}.${(ctx.Identifier[1].image)}`;

        case 1:
        default:
          return ctx.Identifier[0].image;
      }
    }

    subQuery(ctx) {
      const parts = ['(', this.visit(ctx.queryExpression), ')'];
      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias));
      }

      return parts.join(' ');
    }

    whereClause(ctx) {
      const whereItems = ['WHERE', this.visit(ctx.boolExpression)];
      return whereItems.join(' ');
    }

    orderByClause(ctx) {
      const expressions = ctx.orderByItem.map(token => this.visit(token));
      return `ORDER BY ${expressions.join(', ')}`;
    }

    orderByItem(ctx) {
      let expression = [this.visit(ctx.expression)];

      if (ctx.OrderByAsc) {
        expression.push('ASC');
      } else if (ctx.OrderByDesc) {
        expression.push('DESC');
      }

      if (ctx.OrderByNullsFirst) {
        expression.push('NULLS FIRST');
      } else if (ctx.OrderByNullsLast) {
        expression.push('NULLS LAST');
      }

      return expression.join(' ');
    }

    limitClause(ctx) {
      let clause = [ctx.Limit[0].image];

      if (ctx.Offset) {
        clause.push(ctx.Offset[0].image);
      }

      return clause.join(' ');
    }

    groupByClause(ctx) {
      const expressions = ctx.expression.map(token => this.visit(token));
      return `GROUP BY ${expressions.join(', ')}`;
    }

    havingClause(ctx) {
      const whereItems = ['HAVING', this.visit(ctx.boolExpression)];
      return whereItems.join(' ');
    }

    withClause(ctx) {
      const withItems = ctx.withItem.map(token => this.visit(token));
      return `WITH ${withItems.join(', ')}`;
    }

    withItem(ctx) {
      return `${ctx.with_query_name[0].image} AS (${this.visit(ctx.queryExpression)})`;
    }

    asAlias(ctx) {
      return `AS ${ctx.alias[0].image}`;
    }

    boolExpression(ctx) {
      if (ctx.binaryExpression) {
        return this.visit(ctx.binaryExpression);
      } else if (ctx.unaryExpression) {
        return this.visit(ctx.unaryExpression);
      }
    }

    binaryExpression(ctx) {
      const expressionParts = [];
      zip(ctx.atomicExpression, ctx.OperatorBinary)
        .forEach(tokenPair => {
          expressionParts.push(this.visit(tokenPair[0]));
          if (tokenPair[1]) {
            expressionParts.push(tokenPair[1].image);
          }
        });
      return expressionParts.join(' ');
    }

    unaryExpression(ctx) {
      const expressionParts = [
        ctx.OperatorUnary[0].image,
        this.visit(ctx.atomicExpression)
      ];
      return expressionParts.join(' ');
    }

    atomicExpression(ctx) {
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression);
      } else if (ctx.expression) {
        return this.visit(ctx.expression);
      }
    }

    parenthesisExpression(ctx) {
      const expressionParts = [
        '(',
        this.visit(ctx.boolExpression),
        ')'
      ];
      return expressionParts.join('');
    }

    expression(ctx) {
      const literalParts = [];

      if (ctx.literalValue) {
        literalParts.push(this.visit(ctx.literalValue));
      } else if (ctx.Asterisk) {
        literalParts.push('*');
      } else if (ctx.function) {
        literalParts.push(this.visit(ctx.function));
      } else if (ctx.identifier) {
        literalParts.push(this.visit(ctx.identifier));
      } else if (ctx.namedQueryParameter) {
        literalParts.push(this.visit(ctx.namedQueryParameter));
      }

      if (ctx.asAlias) {
        literalParts.push(this.visit(ctx.asAlias));
      }

      return literalParts.join(' ');
    }

    literalValue(ctx) {
      if (ctx.Numeric) {
        return ctx.Numeric[0].image;
      } else if (ctx.String) {
        return ctx.String[0].image;
      } else if (ctx.LiteralConstant) {
        return ctx.LiteralConstant[0].image;
      }
    }

    identifier(ctx) {
      return ctx.Identifier.map(token => token.image).join('.');
    }

    function(ctx) {
      const expressionParts = [
        ctx.functionName[0].image,
        '(',
        ctx.expression.map(token => this.visit(token)).join(', '),
        ')'
      ];
      return expressionParts.join('');
    }

    namedQueryParameter(ctx) {
      return `@${ctx.Identifier[0].image}`;
    }
  }

  return new Visitor;
};
