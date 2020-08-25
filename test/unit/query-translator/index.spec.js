'use strict';

const subject = require('../../../src/lib/query-translator');

const _getTestCaseData = function(testName) {
  // eslint-disable-next-line security/detect-non-literal-require
  const content = require('./testcases/' + testName + '.txt');
  return /^--INPUT--\n([\s\S]+?)\n--EXPECT--\n([\s\S]*?)\n*$/.exec(content);
};

const composeTestCase = function(testName) {
  const result = _getTestCaseData(testName);
  return function() {
    expect(subject(result[1], 'defaultProject')).to.be.eql(result[2]);
  };
};

const composeErrorTestCase = function(testName) {
  const result = _getTestCaseData(testName);
  return function() {
    expect(subject(result[1], 'defaultProject')).to.be.undefined;
  };
};

describe('Query Translator', function() {
  describe('select expression', function() {
    it('simple query', composeTestCase('select-simple-query'));
    it('handling asterisk as expression', composeTestCase('select-simple-query-with-asterisk'));
    it('handling one field name', composeTestCase('select-simple-query-with-one-field-name'));
    it('handling more field names', composeTestCase('select-simple-query-with-more-field-names'));
    it('handling mixed expressions', composeTestCase('select-simple-query-with-mixed-expressions'));

    it('SELECT DISTINCT', composeTestCase('select-distinct'));
    it('SELECT ALL', composeTestCase('select-all'));

    it('rejects SELECT ALL DISTINCT', composeErrorTestCase('error-select-distinct-all'));
  });

  describe('from clause', function() {
    describe('dataset handling', function() {
      it('converts project.dataset to project__dataset',
        composeTestCase('from-clause-dataset-project-handling'));
      it('converts project.dataset to project__dataset',
        composeTestCase('from-clause-dataset-project-handling-uses-default'));
      it('handles table reference if not in dataset/project', composeTestCase('from-clause-table-name'));
    });

    describe('table alias', function() {
      it('handles alias', composeTestCase('from-clause-table-alias'));
      it('handles AS alias', composeTestCase('from-clause-table-alias-with-as'));
    });

    describe('from items', function() {
      it('handles more from items', composeTestCase('from-clause-more-items'));
    })
  });

  describe('group by clause', function() {
    it('handles one expression', composeTestCase('group-by-handles-an-expression'));
    it('handles more expressions', composeTestCase('group-by-handles-more-expressions'));
  });

  describe('order by clause', function() {
    it('handles one field', composeTestCase('order-by-handles-one-field'));
    it('handles more fields', composeTestCase('order-by-handles-more-fields'));
    it('handles a field ASC', composeTestCase('order-by-handles-field-asc'));
    it('handles a field DESC', composeTestCase('order-by-handles-field-desc'));
    it('handles more fields ASC/DESC', composeTestCase('order-by-handles-more-fields-asc-desc'));

    it('handles NULLS FIRST', composeTestCase('order-by-handles-nulls-first'));
    it('handles NULLS LAST', composeTestCase('order-by-handles-nulls-last'));

    it('handles complex definition', composeTestCase('order-by-complex-definition'));
  });

  describe('limit clause', function() {
    it('only limit', composeTestCase('limit-clause-only-limit'));
    it('limit with offset', composeTestCase('limit-clause-limit-offset'));
  });

  describe('special cases', function() {
    it('whitespace handling', composeTestCase('whitespace-handling'));
  });
});
