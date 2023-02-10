import BaseEntityResponse from '../baseEntityResponse';
import TableDataListResponse from './response';
import { expect } from 'chai';
import { POSTGRES_TYPES } from '../../lib/bigQuery/types';
import { FieldType } from '../../lib/db/types/fieldType';

describe('TableDataListResponse', function() {
  it('extends BaseEntityResponseObject', function() {
    expect(new TableDataListResponse).to.be.instanceof(BaseEntityResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TableDataListResponse).to.have.property('TYPE').that.eql('tableDataList');
  });

  it('empty data', function() {
    const subject = new TableDataListResponse([], 0, null, []);
    expect(subject.compose()).to.be.eql({
      rows: [],
      totalRows: 0
    });
  });

  context('with data', function() {
    [
      { type: POSTGRES_TYPES.TEXT, input: 'string', output: 'string' },
      { type: POSTGRES_TYPES.TIMESTAMP, input: '2021-05-01T20:20:21.000Z', output: '1.619900421E9' },
      // { type: POSTGRES_TYPES.DATETIME, input: '2021-05-01T20:20:21.000Z', output: '2021-05-01T20:20:21' },
      { type: POSTGRES_TYPES.DATE, input: '2021-05-01T20:20:21.000Z', output: '2021-05-01' },
      { type: POSTGRES_TYPES.TIME, input: '20:20:21', output: '20:20:21' },
      { type: POSTGRES_TYPES.TEXT, input: null, output: null },
      { type: POSTGRES_TYPES.FLOAT8, input: Infinity, output: 'Infinity' },
      { type: POSTGRES_TYPES.FLOAT8, input: -Infinity, output: '-Infinity' },
      { type: POSTGRES_TYPES.FLOAT8, input: NaN, output: 'NaN' }
    ].forEach(testCase => {
      it(`${testCase.type} with value "${testCase.input}"`, function() {
        const subject = new TableDataListResponse(
          [{ field: testCase.input }],
          1,
          null,
          [{ name: 'field', type: testCase.type, mode: FieldType.NULLABLE }]
        );
        expect(subject.compose().rows).to.be.eql([{ f: [{ v: testCase.output }] }]);
      });
    });
  });
});
