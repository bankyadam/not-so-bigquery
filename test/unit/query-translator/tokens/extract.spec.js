'use strict';

const token = require('../../../../src/lib/query-translator/tokens/extract');

describe('EXTRACT token', function() {
  [
    'extract',
    'EXTRACT'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
