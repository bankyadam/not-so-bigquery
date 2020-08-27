'use strict';

const token = require('../../../../src/lib/query-translator/tokens/order_by');

describe('ORDER BY token', function() {
  [
    'order by',
    'ORDER BY'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
