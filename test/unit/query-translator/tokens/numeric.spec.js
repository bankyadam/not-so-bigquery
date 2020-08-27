'use strict';

const token = require('../../../../src/lib/query-translator/tokens/numeric');

describe('NUMERIC token', function() {
  [
    '0',
    '1',
    '123',
    '.0123',
    '123.',
    '+112',
    '-112',
    '-.113',
    '+.123',
    '123E123',
    '123E-12',
    '123E+12',
    '123e123',
    '123e-12',
    '123e+12'
  ].forEach(image => {
    it(`identifies '${image}'`, function() {
      const result = token.PATTERN.exec(image);
      expect(image).to.be.eql(result[0]);
    });
  });
});
