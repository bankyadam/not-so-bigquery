import testTokenImages from './_test-token-image';
import { Cast } from '../../../../src/lib/query-translator/tokens/definitions/cast';

describe('CAST token', function() {
  testTokenImages(new Cast(), [
    'cast',
    'CAST'
  ]);
});
