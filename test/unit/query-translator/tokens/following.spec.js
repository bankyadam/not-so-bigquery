'use strict';

const token = require('../../../../src/lib/query-translator/tokens/following');

describe('FOLLOWING token', function() {
  [
    'following',
    'FOLLOWING'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
