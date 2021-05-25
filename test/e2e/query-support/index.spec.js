'use strict';
const fs = require('fs');

const bq = require('../common/connection-fake');
const convertTable = require('../../support/table-to-json');

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
      const [data] = await bq.query(result[1]);
      const expectedData = convertTable(result[2]);
      expect(data).to.be.eql(expectedData);
    };
  };

  it('cast numeric string to int64', runTestCase(require('./testcases/cast-numeric-string-to-int64.txt')));
  it.skip('cast hex string to int64', runTestCase(require('./testcases/cast-hex-string-to-int64.txt')));
});
