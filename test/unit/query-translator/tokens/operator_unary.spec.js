'use strict';

const token = require('../../../../src/lib/query-translator/tokens/operator_unary');

describe('Unary Operators token', function() {
  [
    'NOT',
    'not'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
