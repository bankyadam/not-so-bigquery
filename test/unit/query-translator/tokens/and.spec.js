'use strict';

const token = require('../../../../src/lib/query-translator/tokens/and');

describe('AND token', function() {
  [
    'and',
    'AND'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
