import testTokenImages from './_test-token-image';
import { Interval } from '../../../../src/lib/query-translator/tokens/definitions/interval';

describe('INTERVAL token', function() {
  testTokenImages(new Interval(), [
    'interval',
    'INTERVAL'
  ]);
});
