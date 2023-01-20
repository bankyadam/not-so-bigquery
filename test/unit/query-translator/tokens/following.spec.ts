import testTokenImages from './_test-token-image';
import { Following } from '../../../../src/lib/query-translator/tokens/definitions/following';

describe('FOLLOWING token', function() {
  testTokenImages(new Following(), [
    'following',
    'FOLLOWING'
  ]);
});
