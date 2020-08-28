'use strict';

const token = require('../../../../src/lib/query-translator/tokens/having');

describe('HAVING token', function() {
  [
    'having',
    'HAVING'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
