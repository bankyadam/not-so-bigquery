'use strict';

const token = require('../../../../src/lib/query-translator/tokens/order_by_asc');

describe('ASC token', function() {
  [
    'asc',
    'ASC'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
