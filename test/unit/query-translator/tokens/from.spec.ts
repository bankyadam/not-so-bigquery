import testTokenImages from './_test-token-image';
import { From } from '../../../../src/lib/query-translator/tokens/definitions/from';

describe('FROM token', function() {
  testTokenImages(new From(), [
    'from',
    'FROM'
  ]);
});
