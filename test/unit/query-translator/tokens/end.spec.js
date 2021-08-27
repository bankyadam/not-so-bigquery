'use strict';

const token = require('../../../../src/lib/query-translator/tokens/end');

describe('END token', function() {
  [
    'end',
    'END'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
