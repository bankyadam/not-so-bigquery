import testTokenImages from './_test-token-image';
import { Using } from '../../../../src/lib/query-translator/tokens/definitions/using';

describe('USING token', function() {
  testTokenImages(new Using(), [
    'using',
    'USING'
  ]);
});
