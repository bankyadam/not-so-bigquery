'use strict';

const token = require('../../../../src/lib/query-translator/tokens/from');

describe('FROM token', function() {
  [
    'from',
    'FROM'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
