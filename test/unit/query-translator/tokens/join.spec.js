'use strict';

const token = require('../../../../src/lib/query-translator/tokens/join');

describe('JOIN token', function() {
  [
    'JOIN',
    'join'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
