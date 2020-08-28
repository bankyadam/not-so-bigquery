'use strict';

const token = require('../../../../src/lib/query-translator/tokens/on');

describe('ON token', function() {
  [
    'on',
    'ON'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
