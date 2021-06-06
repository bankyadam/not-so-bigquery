'use strict';

const convert = require('./table-to-json');

describe('Table to JSON converter', function() {
  it('one column with data', function() {
    const input = `
+-------+
| first |
+-------+
| data  |
+-------+
`;
    expect(convert(input)).to.be.eql([{ first: 'data' }]);
  });

  it('multi-column with data', function() {
    const input = `
+-------+-------+-------+-------+-------+
| first | foo | bar | baz | header_name |
+-------+-------+-------+-------+-------+
| data  | 123  | FALSE  | NULL  | value |
+-------+-------+-------+-------+-------+
`;
    expect(convert(input)).to.be
      .eql([{ first: 'data', foo: '123', bar: false, baz: null, header_name: 'value' }]);
  });

  it('multi line', function() {
    const input = `
+--------+
| number |
+--------+
| 1      |
| 2      |
| 3      |
| 4      |
+--------+
`;
    expect(convert(input)).to.be
      .eql([
        { number: '1' },
        { number: '2' },
        { number: '3' },
        { number: '4' }
      ]);
  });

  it('support empty cell', function() {
    const input = `
+-------+
| empty |
+-------+
|       |
+-------+
`;
    expect(convert(input)).to.be.eql([{ empty: '' }]);
  });

  it('no data row', function() {
    const input = `
+-------+
| empty |
+-------+
`;
    expect(convert(input)).to.be.eql([]);
  });

  describe('Cast data type', function() {
    it('supports string', function() {
      const input = `
| data |
| string |
`;
      expect(convert(input)).to.be.eql([{ data: 'string' }]);
    });

    it('supports empty string', function() {
      const input = `
| data |
|   |
`;
      expect(convert(input)).to.be.eql([{ data: '' }]);
    });

    it('supports NULL', function() {
      const input = `
| data |
| NULL  |
`;
      expect(convert(input)).to.be.eql([{ data: null }]);
    });

    it('supports boolean TRUE', function() {
      const input = `
| data |
| TRUE  |
`;
      expect(convert(input)).to.be.eql([{ data: true }]);
    });

    it('supports boolean FALSE', function() {
      const input = `
| data |
| FALSE  |
`;
      expect(convert(input)).to.be.eql([{ data: false }]);
    });

    it('supports number', function() {
      const input = `
| data |
| 1.123  |
`;
      expect(convert(input)).to.be.eql([{ data: '1.123' }]);
    });

    it('supports date', function() {
      const input = `
| data |
| 2021-01-01  |
`;
      expect(convert(input)).to.be.eql([{ data: '2021-01-01' }]);
    });
  });
});
