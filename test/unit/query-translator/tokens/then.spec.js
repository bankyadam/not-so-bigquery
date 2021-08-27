'use strict';

const token = require('../../../../src/lib/query-translator/tokens/then');

describe('THEN token', function() {
  [
    'then',
    'THEN'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
