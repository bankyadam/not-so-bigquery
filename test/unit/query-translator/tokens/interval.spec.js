'use strict';

const token = require('../../../../src/lib/query-translator/tokens/interval');

describe('INTERVAL token', function() {
  [
    'interval',
    'INTERVAL'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
