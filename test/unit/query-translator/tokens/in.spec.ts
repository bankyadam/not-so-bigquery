import testTokenImages from './_test-token-image';
import { In } from '../../../../src/lib/query-translator/tokens/definitions/in';

describe('IN token', function() {
  testTokenImages(new In(), [
    'in',
    'IN'
  ]);
});
