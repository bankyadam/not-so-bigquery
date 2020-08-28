'use strict';

const token = require('../../../../src/lib/query-translator/tokens/using');

describe('USING token', function() {
  [
    'using',
    'USING'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
