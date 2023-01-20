import testTokenImages from './_test-token-image';
import { Where } from '../../../../src/lib/query-translator/tokens/definitions/where';

describe('WHERE token', function() {
  testTokenImages(new Where(), [
    'where',
    'WHERE'
  ]);
});
