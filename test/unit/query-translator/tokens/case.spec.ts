import testTokenImages from './_test-token-image';
import { Case } from '../../../../src/lib/query-translator/tokens/definitions/case';

describe('CASE token', function() {
  testTokenImages(new Case(), [
    'case',
    'CASE'
  ]);
});
