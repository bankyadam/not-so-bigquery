import testTokenImages from './_test-token-image';
import { Limit } from '../../../../src/lib/query-translator/tokens/definitions/limit';

describe('LIMIT token', function() {
  testTokenImages(new Limit(), [
    'limit',
    'LIMIT'
  ]);
});
