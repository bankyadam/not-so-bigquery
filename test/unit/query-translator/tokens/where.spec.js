'use strict';

const token = require('../../../../src/lib/query-translator/tokens/where');

describe('WHERE token', function() {
  [
    'where',
    'WHERE'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
