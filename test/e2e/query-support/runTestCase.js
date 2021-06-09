'use strict';

const { mapValues } = require('lodash');

const bq = require('../common/connection-fake');
const convertTable = require('../../support/table-to-json');
const prepareTable = function(tableData) {
  return tableData
    .replace(/{CURRENT_DATE}/g, (new Date).toISOString().substr(0, 10));
};

const _getTestCaseData = function(content) {
  return /^--SQL--\n([\s\S]+?)\n--RESULT--\n([\s\S]*?)$/.exec(content);
};

module.exports = function(content, expectation) {
  expectation = expectation || function(currentData, expectedData) {
    expect(currentData).to.be.eql(expectedData);
  };
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
    expectation(data, expectedData);
  };
};
