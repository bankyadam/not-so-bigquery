import testTokenImages from './_test-token-image';
import { IgnoreRespectNulls } from '../../../../src/lib/query-translator/tokens/definitions/ignore_respect_nulls';

describe('IGNORE or RESPECT NULLS token', function() {
  testTokenImages(new IgnoreRespectNulls(), [
    'ignore nulls',
    'RESPECT NULLS'
  ]);
});
