import testTokenImages from './_test-token-image';
import { OrderByAsc } from '../../../../src/lib/query-translator/tokens/definitions/order_by_asc';

describe('ASC token', function() {
  testTokenImages(new OrderByAsc(), [
    'asc',
    'ASC'
  ]);
});
