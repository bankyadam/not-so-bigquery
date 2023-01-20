import { As } from '../../../../src/lib/query-translator/tokens/definitions/as';
import testTokenImages from './_test-token-image';

describe('AS token', function() {
  testTokenImages(new As(), [
    'as',
    'AS'
  ]);
});
