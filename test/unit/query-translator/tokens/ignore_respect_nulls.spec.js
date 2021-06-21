'use strict';

const token = require('../../../../src/lib/query-translator/tokens/ignore_respect_nulls');

describe('IGNORE or RESPECT NULLS token', function() {
  [
    'ignore nulls',
    'RESPECT NULLS'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
