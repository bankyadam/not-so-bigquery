import testTokenImages from './_test-token-image';
import { Join } from '../../../../src/lib/query-translator/tokens/definitions/join';

describe('JOIN token', function() {
  testTokenImages(new Join(), [
    'JOIN',
    'join'
  ]);
});
