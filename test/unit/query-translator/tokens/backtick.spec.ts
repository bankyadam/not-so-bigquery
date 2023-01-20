import { Backtick } from '../../../../src/lib/query-translator/tokens/definitions/backtick';
import testTokenImages from './_test-token-image';

describe('` token', function() {
  testTokenImages(new Backtick(), [
    '`'
  ]);
});
