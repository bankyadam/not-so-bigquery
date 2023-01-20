import testTokenImages from './_test-token-image';
import { CurrentRow } from '../../../../src/lib/query-translator/tokens/definitions/current_row';

describe('CURRENT ROW token', function() {
  testTokenImages(new CurrentRow(), [
    'current row',
    'CURRENT ROW'
  ]);
});
