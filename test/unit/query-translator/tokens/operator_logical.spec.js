'use strict';

const token = require('../../../../src/lib/query-translator/tokens/operator_logical');

describe('Logical Operators token', function() {
  [
    'AND',
    'OR',
    'and',
    'or'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
