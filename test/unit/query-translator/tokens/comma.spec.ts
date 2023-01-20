import testTokenImages from './_test-token-image';
import { Comma } from '../../../../src/lib/query-translator/tokens/definitions/comma';

describe(', token', function() {
  testTokenImages(new Comma(), [
    ','
  ]);
});
