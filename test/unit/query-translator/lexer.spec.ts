import { mapKeys } from 'lodash';
import { expect } from 'chai';
import TOKENS from '../../../src/lib/query-translator/tokens';
import { lexerDefinition } from '../../../src/lib/query-translator/lexer';

describe('Lexer Definition', function() {
  mapKeys(TOKENS, function(token, tokenName) {
    it('contains token: ' + tokenName, function() {
      expect(lexerDefinition).contain(token);
    });
  });

  it('has length of token\'s count', function() {
    expect(lexerDefinition).to.have.lengthOf(Object.keys(TOKENS).length);
  });
});
