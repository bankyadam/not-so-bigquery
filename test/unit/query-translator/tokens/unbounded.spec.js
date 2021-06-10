'use strict';

const token = require('../../../../src/lib/query-translator/tokens/unbounded');

describe('UNBOUNDED token', function() {
  [
    'unbounded',
    'UNBOUNDED'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
