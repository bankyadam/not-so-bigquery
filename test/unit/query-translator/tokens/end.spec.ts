import testTokenImages from './_test-token-image';
import { End } from '../../../../src/lib/query-translator/tokens/definitions/end';

describe('END token', function() {
  testTokenImages(new End(), [
    'end',
    'END'
  ]);
});
