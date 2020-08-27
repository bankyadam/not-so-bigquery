'use strict';

const token = require('../../../../src/lib/query-translator/tokens/order_by_desc');

describe('DESC token', function() {
  [
    'desc',
    'DESC'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
