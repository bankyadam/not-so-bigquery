import convert from './table-to-json';
import { expect } from 'chai';

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

  it('skips delimiter lines', function() {
    const input = `
+-------+
| first |
|-------|
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
      .eql([{ first: 'data', foo: 123, bar: false, baz: null, header_name: 'value' }]);
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
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 }
      ]);
  });

  it('_common empty cell', function() {
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

    it('supports number (float)', function() {
      const input = `
| data |
| 1.123  |
`;
      expect(convert(input)).to.be.eql([{ data: 1.123 }]);
    });

    it('supports date', function() {
      const input = `
| data |
| 2021-01-01  |
`;
      expect(convert(input)).to.be.eql([{ data: '2021-01-01' }]);
    });

    it('forces string', function() {
      const input = `
| int! |
| 123  |
`;
      expect(convert(input)).to.be.eql([{ int: '123' }]);
    });

    it('forces number', function() {
      const input = `
| num+ |
| Infinity  |
| -Infinity  |
| NaN  |
`;
      expect(convert(input)).to.be.eql([{ num: Infinity }, { num: -Infinity }, { num: NaN }]);
    });

    describe('forced bytes', function() {

      it('handles simple strings as bytes', function() {
        const input = `
| bytes>       |
| 123          |
| "'string'"\\\\\\" |
| \xd0\xb0\xd0\xb1\xd0\xb2\xd0\xb3\xd0\xb4 |
`;
        expect(convert(input)).to.be.eql([
          { bytes: Buffer.from('123', 'utf8') },
          { bytes: Buffer.from(String.raw`"'string'"\\\"`, 'utf8') },
          { bytes: Buffer.from('абвгд', 'utf8') }
        ]);
      });

      it('hexa chars', function() {
        const input = `
| bytes>       |
| \\x31\\x32\\x33 |
`;
        expect(convert(input)).to.be.eql([
          { bytes: Buffer.from('123', 'utf8') }
        ]);
      });
    })

    describe('array', function() {
      it('empty', function() {
        const input = `
| empty[] |
| []      |
| [   ]   |
`;
        expect(convert(input)).to.be.eql([{ empty: [] }, { empty: [] }]);
      });

      it('numbers', function() {
        const input = `
| array[] |
| [1,2]   |
`;
        expect(convert(input)).to.be.eql([{ array: [{ value: 1 }, { value: 2 }] }]);
      });

      it('nulls', function() {
        const input = `
| nulls[]        |
| [NULL, NULL]   |
`;
        expect(convert(input)).to.be.eql([{ nulls: [{ value: null }, { value: null }] }]);
      });

      it('null value', function() {
        const input = `
| nulls[] |
| NULL    |
`;
        expect(convert(input)).to.be.eql([{ nulls: null }]);
      });
    })
  });
});
