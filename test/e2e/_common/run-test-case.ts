import { mapValues } from 'lodash';
import { extname } from 'path';
import bq from './connection-fake';
import convertTable from '../../_common/table-to-json';
import { expect } from 'chai';
import marked from 'marked';

const prepareTable = function(tableData) {
  return tableData
    .replace(/{CURRENT_DATE}/g, (new Date).toISOString().substr(0, 10));
};

const _getTestCaseDataFromText = function(content) {
  return /^--SQL--\n([\s\S]+?)\n--RESULT--\n([\s\S]*?)$/.exec(content);
};

const _getTestCaseDataFromMarkdown = function(content) {
  const tokens = marked.lexer(content);
  const query = tokens.find(t => t.type === 'code' && t.lang === 'sql').text;
  const result = tokens.find(t => t.type === 'table').raw;
  return [null, query, result];
}

type ExpectationInput = string | object | [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExpectationOutput = any | any[];
// eslint-disable-next-line no-unused-vars
type Expectation = (currentData: ExpectationInput, expectedData: ExpectationOutput) => void;

const DEFAULT: Expectation = function(currentData, expectedData) {
  expect(currentData).to.be.eql(expectedData);
};

const NOT_ORDERED: Expectation = function(currentData, expectedData) {
  expect(currentData).to.have.deep.members(expectedData);
};

export default (baseFolder) => function(path, expectation: Expectation = DEFAULT) {
  return async () => {
    let result;
    // eslint-disable-next-line security/detect-non-literal-require
    const content = require(`${baseFolder}/${path}`);
    switch (extname(path)) {
      case '.txt':
        result = _getTestCaseDataFromText(content);
        break;

      case '.md':
        result = _getTestCaseDataFromMarkdown(content);
        break;

      default:
    }
    let [data] = await bq.query(result[1]);
    data = data.map(row => {
      return mapValues(row, value => {
        if (value !== null && value.value) {
          return value.value;
        }
        return value;
      });
    });
    const expectedData = convertTable(prepareTable(result[2]));
    expectation(data, expectedData);
  };
}

export const EXPECTATIONS = { DEFAULT, NOT_ORDERED };
