import testTokenImages from './_test-token-image';
import { Unbounded } from '../../../../src/lib/query-translator/tokens/definitions/unbounded';

describe('UNBOUNDED token', function() {
  testTokenImages(new Unbounded(), [
    'unbounded',
    'UNBOUNDED'
  ]);
});
