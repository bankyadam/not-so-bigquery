'use strict';
const fs = require('fs');

const subject = require('../../../src/lib/query-translator');

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

describe('Query Translator', function() {
  const _getTestCaseData = function(content) {
    return /^--INPUT--\n([\s\S]+?)\n--EXPECT--\n([\s\S]*?)$/.exec(content);
  };

  const runExpectation = function(content) {
    return () => {
      const result = _getTestCaseData(content);
      expect(subject(result[1], 'defaultProject').toLowerCase())
        .to.be.equalIgnoreSpaces(result[2].toLowerCase());
    };
  };

  /* eslint-disable max-len */
  it('comment-inline-block-style', runExpectation(require('./testcases/comment-inline-block-style.txt')));
  it('comment-inline-c-style', runExpectation(require('./testcases/comment-inline-c-style.txt')));
  it('comment-inline-sql-style', runExpectation(require('./testcases/comment-inline-sql-style.txt')));
  it('comment-multi-line-block-style-empty', runExpectation(require('./testcases/comment-multi-line-block-style-empty.txt')));
  it('comment-multi-line-block-style-starting-end-of-line', runExpectation(require('./testcases/comment-multi-line-block-style-starting-end-of-line.txt')));
  it('comment-multi-line-block-style', runExpectation(require('./testcases/comment-multi-line-block-style.txt')));
  it('comment-single-line-c-style', runExpectation(require('./testcases/comment-single-line-c-style.txt')));
  it('comment-single-line-sql-style', runExpectation(require('./testcases/comment-single-line-sql-style.txt')));
  it('expression-cast', runExpectation(require('./testcases/expression-cast.txt')));
  it('expression-comma-separated-list', runExpectation(require('./testcases/expression-comma-separated-list.txt')));
  it('from-clause-backtick-table-name', runExpectation(require('./testcases/from-clause-backtick-table-name.txt')));
  it('from-clause-dataset-project-handling-uses-default', runExpectation(require('./testcases/from-clause-dataset-project-handling-uses-default.txt')));
  it('from-clause-dataset-project-handling', runExpectation(require('./testcases/from-clause-dataset-project-handling.txt')));
  it('from-clause-inner-join-table', runExpectation(require('./testcases/from-clause-inner-join-table.txt')));
  it('from-clause-join-more-tables', runExpectation(require('./testcases/from-clause-join-more-tables.txt')));
  it('from-clause-join-table', runExpectation(require('./testcases/from-clause-join-table.txt')));
  it('from-clause-join-using', runExpectation(require('./testcases/from-clause-join-using.txt')));
  it('from-clause-more-items', runExpectation(require('./testcases/from-clause-more-items.txt')));
  it('from-clause-subquery-inception', runExpectation(require('./testcases/from-clause-subquery-inception.txt')));
  it('from-clause-subquery-with-alias', runExpectation(require('./testcases/from-clause-subquery-with-alias.txt')));
  it('from-clause-subquery', runExpectation(require('./testcases/from-clause-subquery.txt')));
  it('from-clause-table-alias-with-as', runExpectation(require('./testcases/from-clause-table-alias-with-as.txt')));
  it('from-clause-table-alias', runExpectation(require('./testcases/from-clause-table-alias.txt')));
  it('from-clause-table-name', runExpectation(require('./testcases/from-clause-table-name.txt')));
  it('group-by-handles-an-expression', runExpectation(require('./testcases/group-by-handles-an-expression.txt')));
  it('group-by-handles-more-expressions', runExpectation(require('./testcases/group-by-handles-more-expressions.txt')));
  it('having-simple', runExpectation(require('./testcases/having-simple.txt')));
  it('limit-clause-limit-offset', runExpectation(require('./testcases/limit-clause-limit-offset.txt')));
  it('limit-clause-only-limit', runExpectation(require('./testcases/limit-clause-only-limit.txt')));
  it('order-by-complex-definition', runExpectation(require('./testcases/order-by-complex-definition.txt')));
  it('order-by-handles-field-asc', runExpectation(require('./testcases/order-by-handles-field-asc.txt')));
  it('order-by-handles-field-desc', runExpectation(require('./testcases/order-by-handles-field-desc.txt')));
  it('order-by-handles-more-fields-asc-desc', runExpectation(require('./testcases/order-by-handles-more-fields-asc-desc.txt')));
  it('order-by-handles-more-fields', runExpectation(require('./testcases/order-by-handles-more-fields.txt')));
  it('order-by-handles-nulls-first', runExpectation(require('./testcases/order-by-handles-nulls-first.txt')));
  it('order-by-handles-nulls-last', runExpectation(require('./testcases/order-by-handles-nulls-last.txt')));
  it('order-by-handles-one-field', runExpectation(require('./testcases/order-by-handles-one-field.txt')));
  it('query-expression-bracketed-query-expression', runExpectation(require('./testcases/query-expression-bracketed-query-expression.txt')));
  it('query-expression-inside-query-expression', runExpectation(require('./testcases/query-expression-inside-query-expression.txt')));
  it('select-all', runExpectation(require('./testcases/select-all.txt')));
  it('select-binary-operator-is', runExpectation(require('./testcases/select-binary-operator-is.txt')));
  it('select-distinct', runExpectation(require('./testcases/select-distinct.txt')));
  it('select-function-empty', runExpectation(require('./testcases/select-function-empty.txt')));
  it('select-function-inception', runExpectation(require('./testcases/select-function-inception.txt')));
  it('select-function-with-asterisk', runExpectation(require('./testcases/select-function-with-asterisk.txt')));
  it('select-literals', runExpectation(require('./testcases/select-literals.txt')));
  it('select-simple-query-with-asterisk', runExpectation(require('./testcases/select-simple-query-with-asterisk.txt')));
  it('select-simple-query-with-mixed-expressions', runExpectation(require('./testcases/select-simple-query-with-mixed-expressions.txt')));
  it('select-simple-query-with-more-field-names', runExpectation(require('./testcases/select-simple-query-with-more-field-names.txt')));
  it('select-simple-query-with-one-field-name', runExpectation(require('./testcases/select-simple-query-with-one-field-name.txt')));
  it('select-simple-query', runExpectation(require('./testcases/select-simple-query.txt')));
  it('select-struct', runExpectation(require('./testcases/select-struct.txt')));
  it('select-with-complex-expressions', runExpectation(require('./testcases/select-with-complex-expressions.txt')));
  it('select-with-named-query-parameter', runExpectation(require('./testcases/select-with-named-query-parameter.txt')));
  it('select-with-qualified-identifiers', runExpectation(require('./testcases/select-with-qualified-identifiers.txt')));
  it('where-binary-operator-and', runExpectation(require('./testcases/where-binary-operator-and.txt')));
  it('where-binary-operator-between-expressions', runExpectation(require('./testcases/where-binary-operator-between-expressions.txt')));
  it('where-binary-operator-between-simple', runExpectation(require('./testcases/where-binary-operator-between-simple.txt')));
  it('where-binary-operator-between-single', runExpectation(require('./testcases/where-binary-operator-between-single.txt')));
  it('where-binary-operator-equal', runExpectation(require('./testcases/where-binary-operator-equal.txt')));
  it('where-binary-operator-is', runExpectation(require('./testcases/where-binary-operator-is.txt')));
  it('where-binary-operator-or', runExpectation(require('./testcases/where-binary-operator-or.txt')));
  it('where-grouping-complex', runExpectation(require('./testcases/where-grouping-complex.txt')));
  it('where-grouping-simple', runExpectation(require('./testcases/where-grouping-simple.txt')));
  it('where-literal-value', runExpectation(require('./testcases/where-literal-value.txt')));
  it('where-simple', runExpectation(require('./testcases/where-simple.txt')));
  it('where-unary-operator-not', runExpectation(require('./testcases/where-unary-operator-not.txt')));
  it('whitespace-handling', runExpectation(require('./testcases/whitespace-handling.txt')));
  it('with-clause-more-items', runExpectation(require('./testcases/with-clause-more-items.txt')));
  it('with-clause-simple-query', runExpectation(require('./testcases/with-clause-simple-query.txt')));
  it('with-clause-with-inception', runExpectation(require('./testcases/with-clause-with-inception.txt')));
});
