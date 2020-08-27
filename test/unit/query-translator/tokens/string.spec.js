'use strict';

const token = require('../../../../src/lib/query-translator/tokens/string');

describe('STRING token', function() {
  [
    /* eslint-disable quotes */
    `"string"`,
    `"string with ' in it"`,
    `"string \\"quoted\\" inside"`,
    `'string'`,
    `'string with " in it'`,
    `'string \\'quoted\\' inside'`,
    `'''multi
line
string'''`,
    `'''can contain (') in it'''`,
    `'''can contain (") in it'''`,
    `"""can contain (") in it"""`,
    `"""can contain (') in it"""`
    /* eslint-enable quotes */
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
