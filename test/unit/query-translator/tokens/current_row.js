'use strict';

const token = require('../../../../src/lib/query-translator/tokens/current_row');

describe('CURRENT ROW token', function() {
  [
    'current row',
    'CURRENT ROW'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
