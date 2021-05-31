'use strict';

const TableDataListResponse = require('./response');

describe('TableDataListResponse', function() {
  it('empty data', function() {
    const subject = new TableDataListResponse([], 0, null, []);
    expect(subject.compose()).to.be.eql({
      rows: [],
      totalRows: 0
    });
  });

  context('with data', function() {
    [
      { type: 'TEXT', input: 'string', output: 'string' },
      { type: 'TIMESTAMP', input: '2021-05-01T20:20:21.000Z', output: '1.619900421E9' },
      // { type: 'DATETIME', input: '2021-05-01T20:20:21.000Z', output: '2021-05-01T20:20:21' },
      { type: 'DATE', input: '2021-05-01T20:20:21.000Z', output: '2021-05-01' },
      { type: 'TIME', input: '20:20:21', output: '20:20:21' }
    ].forEach(testCase => {
      it(testCase.type, function() {
        const subject = new TableDataListResponse(
          [{ field: testCase.input }],
          1,
          null,
          [{ name: 'field', type: testCase.type }]
        );
        expect(subject.compose().rows).to.be.eql([{ f: [{ v: testCase.output }] }]);
      });
    });
  });
});
