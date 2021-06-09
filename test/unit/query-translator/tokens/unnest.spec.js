'use strict';

const token = require('../../../../src/lib/query-translator/tokens/unnest');

describe('UNNEST token', function() {
  [
    'unnest',
    'UNNEST'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
