'use strict';

const token = require('../../../../src/lib/query-translator/tokens/case');

describe('CASE token', function() {
  [
    'case',
    'CASE'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
