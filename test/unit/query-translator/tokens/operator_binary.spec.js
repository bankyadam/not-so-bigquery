'use strict';

const token = require('../../../../src/lib/query-translator/tokens/operator_binary');

describe('Binary Operators token', function() {
  [
    'AND',
    'and',
    'OR',
    'or',
    'IS',
    'is',
    'IS NOT',
    'is not',
    '<=',
    '<',
    '=',
    '>',
    '>=',
    '<>',
    '!='
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
