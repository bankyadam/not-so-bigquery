import testTokenImages from './_test-token-image';
import { Then } from '../../../../src/lib/query-translator/tokens/definitions/then';

describe('THEN token', function() {
  testTokenImages(new Then(), [
    'then',
    'THEN'
  ]);
});
