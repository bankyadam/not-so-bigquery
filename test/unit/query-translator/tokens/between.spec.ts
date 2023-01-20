import testTokenImages from './_test-token-image';
import { Between } from '../../../../src/lib/query-translator/tokens/definitions/between';

describe('BETWEEN token', function() {
  testTokenImages(new Between(), [
    'between',
    'BETWEEN'
  ]);
});
