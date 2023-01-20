import testTokenImages from './_test-token-image';
import { OrderByNullsFirst } from '../../../../src/lib/query-translator/tokens/definitions/order_by_nulls_first';

describe('NULLS FIRST token', function() {
  testTokenImages(new OrderByNullsFirst(), [
    'nulls first',
    'NULLS FIRST'
  ]);
});
