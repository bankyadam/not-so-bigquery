'use strict';
const fs = require('fs');
const path = require('path');

const subject = require('../../../src/lib/query-translator');

describe('Query Translator', function() {
  const _getTestCaseData = function(testName) {
    // eslint-disable-next-line security/detect-non-literal-require
    const content = require('./testcases/' + testName + '.txt');
    return /^--INPUT--\n([\s\S]+?)\n--EXPECT--\n([\s\S]*?)$/.exec(content);
  };

  const composeTestCase = function(testName) {
    const result = _getTestCaseData(testName);
    it(testName, function() {
      expect(subject(result[1], 'defaultProject')).to.be.equalIgnoreSpaces(result[2]);
    });
  };

  fs.readdirSync(__dirname + '/testcases')
    .map(filePath => {
      const basename = path.basename(filePath, '.txt');
      composeTestCase(basename);
    });
});
