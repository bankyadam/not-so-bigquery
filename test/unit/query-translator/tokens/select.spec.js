'use strict';

const token = require('../../../../src/lib/query-translator/tokens/select');

describe('SELECT token', function() {
  [
    'select',
    'SELECT'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
