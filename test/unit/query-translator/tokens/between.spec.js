'use strict';

const token = require('../../../../src/lib/query-translator/tokens/between');

describe('BETWEEN token', function() {
  [
    'between',
    'BETWEEN'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
