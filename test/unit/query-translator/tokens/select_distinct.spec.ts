import testTokenImages from './_test-token-image';
import { SelectDistinct } from '../../../../src/lib/query-translator/tokens/definitions/select_distinct';

describe('DISTINCT token', function() {
  testTokenImages(new SelectDistinct(), [
    'distinct',
    'DISTINCT'
  ]);
});
