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
      let statementParts = [this.visit(ctx.select)];
      if (ctx.fromClause) {
        statementParts.push(this.visit(ctx.fromClause));
      }
      if (ctx.groupByClause) {
        statementParts.push(this.visit(ctx.groupByClause));
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
      return `FROM ${this.visit(ctx.fromItem)}`;
    }

    fromItem(ctx) {
      let projectId = ctx.projectName && ctx.datasetName ? this.visit(ctx.projectName) : this.projectId;
      let datasetId = ctx.projectName && !ctx.datasetName ? this.visit(ctx.projectName) : this.visit(ctx.datasetName);
      let tableId = this.visit(ctx.tableName);

      return `${projectId}__${datasetId}.${tableId}`;
    }

    projectName(ctx) {
      return ctx.Identifier[0].image;
    }

    datasetName(ctx) {
      return ctx.Identifier[0].image;
    }

    tableName(ctx) {
      return ctx.Identifier[0].image;
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
      let clause = [`LIMIT ${ctx.Integer[0].image}`];

      if (ctx.offsetClause) {
        clause.push(this.visit(ctx.offsetClause));
      }

      return clause.join(' ');
    }

    offsetClause(ctx) {
      return `OFFSET ${ctx.Integer[0].image}`;
    }

    groupByClause(ctx) {
      const expressions = ctx.expression.map(token => this.visit(token));
      return `GROUP BY ${expressions.join(', ')}`;
    }

    expression(ctx) {
      return ctx.Identifier[0].image;
    }
  }

  return new Visitor;
};
