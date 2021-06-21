'use strict';

const token = require('../../../../src/lib/query-translator/tokens/in');

describe('IN token', function() {
  [
    'in',
    'IN'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
