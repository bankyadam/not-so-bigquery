import { AtCharacter } from '../../../../src/lib/query-translator/tokens/definitions/at_character';
import testTokenImages from './_test-token-image';

describe('@ token', function() {
  testTokenImages(new AtCharacter, ['@']);
});
