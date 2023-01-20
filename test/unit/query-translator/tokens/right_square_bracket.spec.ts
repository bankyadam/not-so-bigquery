import testTokenImages from './_test-token-image';
import { RightSquareBracket } from '../../../../src/lib/query-translator/tokens/definitions/right-square-bracket';

describe('] token', function() {
  testTokenImages(new RightSquareBracket(), [
    ']'
  ]);
});
