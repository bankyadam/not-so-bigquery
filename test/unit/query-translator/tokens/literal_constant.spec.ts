import testTokenImages from './_test-token-image';
import { LiteralConstant } from '../../../../src/lib/query-translator/tokens/definitions/literal_constant';

describe('Literal constants token', function() {
  testTokenImages(new LiteralConstant(), [
    'NULL',
    'null',
    'TRUE',
    'true',
    'FALSE',
    'false'
  ]);
});
