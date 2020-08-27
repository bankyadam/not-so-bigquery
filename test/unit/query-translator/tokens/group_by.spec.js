'use strict';

const token = require('../../../../src/lib/query-translator/tokens/group_by');

describe('GROUP BY token', function() {
  [
    'group by',
    'GROUP BY'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
