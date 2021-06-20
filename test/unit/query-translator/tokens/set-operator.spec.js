'use strict';

const token = require('../../../../src/lib/query-translator/tokens/set-operator');

describe('SET OPERATOR token', function() {
  [
    'UNION',
    'union all',
    'UNION DISTINCT',
    'intersect',
    'INTERSECT DISTINCT',
    'except',
    'EXCEPT DISTINCT'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
