'use strict';

const token = require('../../../../src/lib/query-translator/tokens/else');

describe('ELSE token', function() {
  [
    'else',
    'ELSE'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
