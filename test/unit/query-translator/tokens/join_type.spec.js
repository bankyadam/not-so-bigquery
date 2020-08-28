'use strict';

const token = require('../../../../src/lib/query-translator/tokens/join_type');

describe('Join type token', function() {
  [
    'INNER',
    'inner',
    'CROSS',
    'cross',
    'FULL',
    'full',
    'FULL OUTER',
    'full outer',
    'LEFT',
    'left',
    'LEFT OUTER',
    'left outer',
    'RIGHT',
    'right',
    'RIGHT OUTER',
    'right outer'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
