'use strict';

const token = require('../../../../src/lib/query-translator/tokens/literal_constant');

describe('Literal constants token', function() {
  [
    'NULL',
    'null',
    'TRUE',
    'true',
    'FALSE',
    'false'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
