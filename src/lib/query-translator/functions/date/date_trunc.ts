import { sprintf } from 'sprintf-js';

export default function(ctx) {
  // Can't use .visit(), because this is not an expression, but a literal
  const datePart = ctx.expression[1].children.atomicExpression[0]
    .children.identifier[0].children.AnyWord[0].image.toUpperCase();
  const dateExpression = this.visit(ctx.expression[0]);
  let sql = '';

  switch (datePart) {
    case 'ISOYEAR':
      sql = 'TO_DATE(TO_CHAR(DATE_TRUNC(\'YEAR\', %1$s) + INTERVAL \'1 WEEK\', \'iyyy-iw\'), \'iyyy-iw\')';
      break;

    case 'ISOWEEK':
      sql = 'DATE_TRUNC(\'WEEK\', %1$s)::DATE';
      break;

    case 'WEEK':
      sql = '(DATE_TRUNC(\'WEEK\', %1$s) - INTERVAL \'1 DAY\')::DATE';
      break;

    default:
      sql = 'DATE_TRUNC(\'%2$s\', %1$s)::DATE';
  }

  return sprintf(sql, dateExpression, datePart);
}
