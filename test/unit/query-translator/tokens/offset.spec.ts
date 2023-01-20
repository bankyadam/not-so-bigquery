import testTokenImages from './_test-token-image';
import { Offset } from '../../../../src/lib/query-translator/tokens/definitions/offset';

describe('OFFSET token', function() {
  testTokenImages(new Offset(), [
    'offset 0',
    'OFFSET 12345'
  ]);
});
