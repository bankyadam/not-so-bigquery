import testTokenImages from './_test-token-image';
import { When } from '../../../../src/lib/query-translator/tokens/definitions/when';

describe('WHEN token', function() {
  testTokenImages(new When(), [
    'when',
    'WHEN'
  ]);
});
