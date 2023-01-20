import testTokenImages from './_test-token-image';
import { SelectAll } from '../../../../src/lib/query-translator/tokens/definitions/select_all';

describe('ALL token', function() {
  testTokenImages(new SelectAll(), [
    'all',
    'ALL'
  ]);
});
