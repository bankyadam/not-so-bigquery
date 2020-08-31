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

    expression(ctx) {
      const parts = [this.visit(ctx.atomicExpression)];

      if (ctx.binaryOperatorExpression) {
        parts.push(this.visit(ctx.binaryOperatorExpression));
      }

      return parts.join(' ');
    }

    atomicExpression(ctx) {
      if (ctx.literalValue) {
        return this.visit(ctx.literalValue);
      } else if (ctx.function) {
        return this.visit(ctx.function);
      } else if (ctx.identifier) {
        return this.visit(ctx.identifier);
      } else if (ctx.unaryOperatorExpression) {
        return this.visit(ctx.unaryOperatorExpression);
      } else if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression);
      } else if (ctx.cast) {
        return this.visit(ctx.cast);
      } else if (ctx.namedQueryParameter) {
        return this.visit(ctx.namedQueryParameter);
      } else if (ctx.queryExpression) {
        return ['(', this.visit(ctx.queryExpression), ')'].join('');
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
      let expressions = '';

      if (ctx.expression) {
        expressions = ctx.expression.map(token => this.visit(token)).join(', ');
      } else if (ctx.Asterisk) {
        expressions = '*';
      }

      return [
        ctx.functionName[0].image,
        '(',
        expressions,
        ')'
      ].join('');
    }

    namedQueryParameter(ctx) {
      return [
        '@',
        ctx.Identifier[0].image
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

    cast(ctx) {
      return [
        'CAST',
        '(',
        this.visit(ctx.expression[0]),
        'AS',
        ctx.Identifier[0].image,
        ')'
      ].join(' ');
    }

    binaryOperatorExpression(ctx) {
      return [
        this.visit(ctx.binaryOperator),
        this.visit(ctx.rhs)
      ].join(' ');
    }

    binaryOperator(ctx) {
      if (ctx.OperatorBinary) {
        return ctx.OperatorBinary[0].image;
      } else if (ctx.And) {
        return 'AND';
      }
    }
  }

  return new Visitor;
};
