'use strict';

const token = require('../../../../src/lib/query-translator/tokens/with');

describe('WITH token', function() {
  [
    'with',
    'WITH'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
