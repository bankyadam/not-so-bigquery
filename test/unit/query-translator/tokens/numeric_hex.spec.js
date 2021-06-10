'use strict';

const token = require('../../../../src/lib/query-translator/tokens/numeric_hex');

describe('NUMERIC_HEX token', function() {
  [
    '0x1234',
    '0xabcdef',
    '0xABCDEF'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
