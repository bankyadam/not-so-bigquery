'use strict';

const token = require('../../../../src/lib/query-translator/tokens/limit');

describe('LIMIT token', function() {
  [
    'limit',
    'LIMIT'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
