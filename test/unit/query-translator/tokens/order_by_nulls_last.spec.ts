import testTokenImages from './_test-token-image';
import { OrderByNullsLast } from '../../../../src/lib/query-translator/tokens/definitions/order_by_nulls_last';

describe('NULLS LAST token', function() {
  testTokenImages(new OrderByNullsLast(), [
    'nulls last',
    'NULLS LAST'
  ]);
});
