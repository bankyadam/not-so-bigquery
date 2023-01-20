import testTokenImages from './_test-token-image';
import { On } from '../../../../src/lib/query-translator/tokens/definitions/on';

describe('ON token', function() {
  testTokenImages(new On(), [
    'on',
    'ON'
  ]);
});
