import testTokenImages from './_test-token-image';
import { OrderBy } from '../../../../src/lib/query-translator/tokens/definitions/order_by';

describe('ORDER BY token', function() {
  testTokenImages(new OrderBy(), [
    'order by',
    'ORDER BY'
  ]);
});
