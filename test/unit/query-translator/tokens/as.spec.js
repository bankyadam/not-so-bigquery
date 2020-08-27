'use strict';

const token = require('../../../../src/lib/query-translator/tokens/as');

describe('AS token', function() {
  [
    'as',
    'AS'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
