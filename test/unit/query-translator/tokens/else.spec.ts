import testTokenImages from './_test-token-image';
import { Else } from '../../../../src/lib/query-translator/tokens/definitions/else';

describe('ELSE token', function() {
  testTokenImages(new Else(), [
    'else',
    'ELSE'
  ]);
});
