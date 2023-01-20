import testTokenImages from './_test-token-image';
import { Select } from '../../../../src/lib/query-translator/tokens/definitions/select';

describe('SELECT token', function() {
  testTokenImages(new Select(), [
    'select',
    'SELECT'
  ]);
});
