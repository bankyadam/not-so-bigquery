'use strict';

const token = require('../../../../src/lib/query-translator/tokens/cast');

describe('CAST token', function() {
  [
    'cast',
    'CAST'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
