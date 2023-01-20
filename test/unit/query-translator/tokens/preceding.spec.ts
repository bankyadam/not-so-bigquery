import testTokenImages from './_test-token-image';
import { Preceding } from '../../../../src/lib/query-translator/tokens/definitions/preceding';

describe('PRECEDING token', function() {
  testTokenImages(new Preceding(), [
    'preceding',
    'PRECEDING'
  ]);
});
