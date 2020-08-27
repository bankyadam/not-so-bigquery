'use strict';

const token = require('../../../../src/lib/query-translator/tokens/comment');

describe('Comment token', function() {
  [
    '-- comment',
    '# comment',
    '/* comment */',
    `/* multi line
comment */`,
    `/*
*/`,
    `/*
multi line comment
*/`
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
