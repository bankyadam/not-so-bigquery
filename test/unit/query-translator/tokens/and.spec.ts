import { And } from '../../../../src/lib/query-translator/tokens/definitions/and';
import testTokenImages from './_test-token-image';

describe('AND token', function() {
  testTokenImages(new And(), [
    'and',
    'AND'
  ]);
});
