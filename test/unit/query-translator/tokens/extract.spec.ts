import testTokenImages from './_test-token-image';
import { Extract } from '../../../../src/lib/query-translator/tokens/definitions/extract';

describe('EXTRACT token', function() {
  testTokenImages(new Extract(), [
    'extract',
    'EXTRACT'
  ]);
});
