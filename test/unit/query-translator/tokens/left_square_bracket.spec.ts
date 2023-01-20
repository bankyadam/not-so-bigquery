import testTokenImages from './_test-token-image';
import { LeftSquareBracket } from '../../../../src/lib/query-translator/tokens/definitions/left-square-bracket';

describe('[ token', function() {
  testTokenImages(new LeftSquareBracket(), [
    '['
  ]);
});
