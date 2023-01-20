import testTokenImages from './_test-token-image';
import { OrderByDesc } from '../../../../src/lib/query-translator/tokens/definitions/order_by_desc';

describe('DESC token', function() {
  testTokenImages(new OrderByDesc(), [
    'desc',
    'DESC'
  ]);
});
