import testTokenImages from './_test-token-image';
import { With } from '../../../../src/lib/query-translator/tokens/definitions/with';

describe('WITH token', function() {
  testTokenImages(new With(), [
    'with',
    'WITH'
  ]);
});
