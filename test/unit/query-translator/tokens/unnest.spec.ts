import testTokenImages from './_test-token-image';
import { Unnest } from '../../../../src/lib/query-translator/tokens/definitions/unnest';

describe('UNNEST token', function() {
  testTokenImages(new Unnest(), [
    'unnest',
    'UNNEST'
  ]);
});
