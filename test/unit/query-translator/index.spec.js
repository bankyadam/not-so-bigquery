'use strict';
const fs = require('fs');
const path = require('path');

const subject = require('../../../src/lib/query-translator');

describe('Query Translator', function() {
  const _getTestCaseData = function(testName) {
    const content = fs.readFileSync(__dirname + '/testcases/' + testName + '.txt', 'utf8');
    return /^--INPUT--\n([\s\S]+?)\n--EXPECT--\n([\s\S]*?)$/.exec(content);
  };

  const composeTestCase = function(testName) {
    const result = _getTestCaseData(testName);
    it(testName, function() {
      expect(subject(result[1], 'defaultProject').toLowerCase())
        .to.be.equalIgnoreSpaces(result[2].toLowerCase());
    });
  };

  fs.readdirSync(__dirname + '/testcases')
    .map(filePath => {
      if (path.extname(filePath) !== '.txt') {
        return;
      }
      const basename = path.basename(filePath, '.txt');
      composeTestCase(basename);
    });
});
