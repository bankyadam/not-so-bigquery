'use strict';
const fs = require('fs');
const path = require('path');

const subject = require('../../../src/lib/query-translator');

describe('Query Translator', function() {
  const _getTestCaseData = function(testName) {
    // eslint-disable-next-line security/detect-non-literal-require
    const content = require('./testcases/' + testName + '.txt');
    return /^--INPUT--\n([\s\S]+?)\n--EXPECT--\n([\s\S]*?)\n*$/.exec(content);
  };

  const composeTestCase = function(testName) {
    const result = _getTestCaseData(testName);
    it(testName, function() {
      expect(subject(result[1], 'defaultProject')).to.be.equalIgnoreSpaces(result[2]);
    });
  };

  const composeErrorTestCase = function(testName) {
    const result = _getTestCaseData(testName);
    it(testName, function() {
      expect(subject(result[1], 'defaultProject')).to.be.undefined;
    });
  };

  fs.readdirSync(__dirname + '/testcases')
    .map(filePath => {
      const basename = path.basename(filePath, '.txt');
      if (basename.indexOf('error-') === 0) {
        composeErrorTestCase(basename);
      } else {
        composeTestCase(basename);
      }
    });
});
