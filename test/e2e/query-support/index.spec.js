'use strict';
const fs = require('fs');
const { mapValues } = require('lodash');

const bq = require('../common/connection-fake');
const convertTable = require('../../support/table-to-json');
const prepareTable = function(tableData) {
  return tableData
    .replace(/{CURRENT_DATE}/g, (new Date).toISOString().substr(0, 10));
};

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

describe('SQL Function support', function() {
  const _getTestCaseData = function(content) {
    return /^--SQL--\n([\s\S]+?)\n--RESULT--\n([\s\S]*?)$/.exec(content);
  };

  const runTestCase = function(content) {
    return async () => {
      const result = _getTestCaseData(content);
      let [data] = await bq.query(result[1]);
      data = data.map(row => {
        return mapValues(row, value => {
          if (value.value) { return value.value; }
          return value;
        });
      });
      const expectedData = convertTable(prepareTable(result[2]));
      expect(data).to.be.eql(expectedData);
    };
  };

  /* eslint-disable max-len */
  context('Conversion functions', function() {
    it('cast numeric string to int64', runTestCase(require('./testcases/conversion_functions/cast-numeric-string-to-int64.txt')));
    it.skip('cast hex string to int64', runTestCase(require('./testcases/conversion_functions/cast-hex-string-to-int64.txt')));
  });

  context('Data types', function() {
    it('date_types', runTestCase(require('./testcases/data_types/date_types.txt')));
    it.skip('date_types_not_supported', runTestCase(require('./testcases/data_types/date_types_not_supported.txt')));
  });

  context('Date functions', function() {
    it('current_date without timezone', runTestCase(require('./testcases/date_functions/current_date-without-tz.txt')));

    it('extract day', runTestCase(require('./testcases/date_functions/extract-day.txt')));

    it('date', runTestCase(require('./testcases/date_functions/date.txt')));

    it('date_add', runTestCase(require('./testcases/date_functions/date_add.txt')));
    it('date_sub', runTestCase(require('./testcases/date_functions/date_sub.txt')));
    it('date_diff', runTestCase(require('./testcases/date_functions/date_diff.txt')));
    it('date_trunc', runTestCase(require('./testcases/date_functions/date_trunc.txt')));
  });
});
