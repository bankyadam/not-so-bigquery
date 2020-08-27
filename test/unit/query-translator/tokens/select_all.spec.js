'use strict';

const token = require('../../../../src/lib/query-translator/tokens/select_all');

describe('ALL token', function() {
  [
    'all',
    'ALL'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
