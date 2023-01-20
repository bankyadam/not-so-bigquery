import testTokenImages from './_test-token-image';
import { Over } from '../../../../src/lib/query-translator/tokens/definitions/over';

describe('OVER token', function() {
  testTokenImages(new Over(), [
    'over',
    'OVER'
  ]);
});
