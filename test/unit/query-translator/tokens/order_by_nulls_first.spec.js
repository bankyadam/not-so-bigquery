'use strict';

const token = require('../../../../src/lib/query-translator/tokens/order_by_nulls_first');

describe('NULLS FIRST token', function() {
  [
    'nulls first',
    'NULLS FIRST'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
