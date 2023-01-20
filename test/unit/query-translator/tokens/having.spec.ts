import testTokenImages from './_test-token-image';
import { Having } from '../../../../src/lib/query-translator/tokens/definitions/having';

describe('HAVING token', function() {
  testTokenImages(new Having(), [
    'having',
    'HAVING'
  ]);
});
