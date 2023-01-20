import { mapValues } from 'lodash';
import bq from './connection-fake';
import convertTable from '../../_common/table-to-json';
import { expect } from 'chai';

const prepareTable = function(tableData) {
  return tableData
    .replace(/{CURRENT_DATE}/g, (new Date).toISOString().substr(0, 10));
};

const _getTestCaseData = function(content) {
  return /^--SQL--\n([\s\S]+?)\n--RESULT--\n([\s\S]*?)$/.exec(content);
};

type ExpectationInput = string | object | [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExpectationOutput = any|any[];
// eslint-disable-next-line no-unused-vars
type Expectation = (currentData: ExpectationInput, expectedData: ExpectationOutput) => void;

const DEFAULT:Expectation = function(currentData, expectedData) {
  expect(currentData).to.be.eql(expectedData);
};

const NOT_ORDERED:Expectation = function(currentData, expectedData) {
  expect(currentData).to.have.deep.members(expectedData);
};

export default (baseFolder) => function(content, expectation: Expectation = DEFAULT) {
  return async () => {
    // eslint-disable-next-line security/detect-non-literal-require
    const result = _getTestCaseData(require(`${baseFolder}/${content}`));
    let [data] = await bq.query(result[1]);
    data = data.map(row => {
      return mapValues(row, value => {
        if (value !== null && value.value) { return value.value; }
        return value;
      });
    });
    const expectedData = convertTable(prepareTable(result[2]));
    expectation(data, expectedData);
  };
}

export const EXPECTATIONS = { DEFAULT, NOT_ORDERED };
