'use strict';

const token = require('../../../../src/lib/query-translator/tokens/select_distinct');

describe('DISTINCT token', function() {
  [
    'distinct',
    'DISTINCT'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
