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
      const expressions = ctx.selectExpression.map(token => this.visit(token));
      return expressions.join(', ');
    }

    selectExpression(ctx) {
      const parts = [this.visit(ctx.expression)];
      if (ctx.asAlias) {
        parts.push(this.visit(ctx.asAlias));
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
        this.visit(ctx.boolExpression)
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
        parts.push(this.visit(ctx.asAlias));
      }
      return parts.join(' ');
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
      return [
        'WHERE',
        this.visit(ctx.boolExpression)
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
      if (ctx.OrderByNullsFirst) {
        parts.push('NULLS FIRST');
      } else if (ctx.OrderByNullsLast) {
        parts.push('NULLS LAST');
      }
      return parts.join(' ');
    }

    limitClause(ctx) {
      const parts = [ctx.Limit[0].image];
      if (ctx.Offset) {
        parts.push(ctx.Offset[0].image);
      }
      return parts.join(' ');
    }

    groupByClause(ctx) {
      const expressions = ctx.expression.map(token => this.visit(token));
      return [
        'GROUP BY',
        expressions.join(', ')
      ].join(' ');
    }

    havingClause(ctx) {
      return [
        'HAVING',
        this.visit(ctx.boolExpression)
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
        ctx.with_query_name[0].image,
        'AS',
        '(',
        this.visit(ctx.queryExpression),
        ')'
      ].join(' ');
    }

    asAlias(ctx) {
      return [
        'AS',
        ctx.alias[0].image
      ].join(' ');
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
      return [
        ctx.OperatorUnary[0].image,
        this.visit(ctx.atomicExpression)
      ].join(' ');
    }

    atomicExpression(ctx) {
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression);
      } else if (ctx.expression) {
        return this.visit(ctx.expression);
      }
    }

    parenthesisExpression(ctx) {
      return [
        '(',
        this.visit(ctx.boolExpression),
        ')'
      ].join('');
    }

    expression(ctx) {
      if (ctx.literalValue) {
        return this.visit(ctx.literalValue);
      } else if (ctx.Asterisk) {
        return '*';
      } else if (ctx.function) {
        return this.visit(ctx.function);
      } else if (ctx.identifier) {
        return this.visit(ctx.identifier);
      } else if (ctx.namedQueryParameter) {
        return this.visit(ctx.namedQueryParameter);
      }
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

    ['function'](ctx) {
      return [
        ctx.functionName[0].image,
        '(',
        ctx.expression.map(token => this.visit(token)).join(', '),
        ')'
      ].join('');
    }

    namedQueryParameter(ctx) {
      return [
        '@',
        ctx.Identifier[0].image
      ].join('');
    }
  }

  return new Visitor;
};
