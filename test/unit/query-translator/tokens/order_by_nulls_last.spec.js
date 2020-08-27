'use strict';

const token = require('../../../../src/lib/query-translator/tokens/order_by_nulls_last');

describe('NULLS LAST token', function() {
  [
    'nulls last',
    'NULLS LAST'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
