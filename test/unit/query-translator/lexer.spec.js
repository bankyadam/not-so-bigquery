'use strict';

const { mapKeys } = require('lodash');

const Lexer = require('../../../src/lib/query-translator/lexer');
const TOKENS = require('../../../src/lib/query-translator/tokens');

describe('Lexer Definition', function() {
  mapKeys(TOKENS, function(token, tokenName) {
    it('contains token: ' + tokenName, function() {
      expect(Lexer.lexerDefinition).contain(token);
    });
  });

  it('has length of token\'s count', function() {
    expect(Lexer.lexerDefinition).to.have.lengthOf(Object.keys(TOKENS).length);
  });
});
