'use strict';

const token = require('../../../../src/lib/query-translator/tokens/identifier');

describe('Identifier token', function() {
  [
    'Customers5',
    '`5Customers`',
    'dataField',
    '_dataField1',
    'ADGROUP',
    'table-name',
    '`tableName~`',
    '`GROUP`'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
