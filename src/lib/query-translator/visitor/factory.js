'use strict';

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
      if (ctx.groupByClause) {
        statementParts.push(this.visit(ctx.groupByClause));
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
      if (ctx.Asterisk) {
        return '*';
      } else if (ctx.Integer) {
        return ctx.Integer[0].image;
      } else if (ctx.Identifier) {
        return ctx.Identifier[0].image;
      }
    }

    fromClause(ctx) {
      const fromItems = ctx.fromItem.map(token => this.visit(token));
      return `FROM ${fromItems.join(', ')}`;
    }

    fromItem(ctx) {
      return this.visit(ctx.tableName);
    }

    tableName(ctx) {
      const tableNameParts = ['`' + this.visit(ctx.tableIdentifier) + '`'];
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
      let clause = [`LIMIT ${ctx.count[0].image}`];

      if (ctx.offsetClause) {
        clause.push(this.visit(ctx.offsetClause));
      }

      return clause.join(' ');
    }

    offsetClause(ctx) {
      return `OFFSET ${ctx.skip_rows[0].image}`;
    }

    groupByClause(ctx) {
      const expressions = ctx.expression.map(token => this.visit(token));
      return `GROUP BY ${expressions.join(', ')}`;
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

    expression(ctx) {
      return ctx.Identifier[0].image;
    }
  }

  return new Visitor;
};
