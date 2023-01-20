import testTokenImages from './_test-token-image';
import { RightParenthesis } from '../../../../src/lib/query-translator/tokens/definitions/right-parenthesis';

describe(') token', function() {
  testTokenImages(new RightParenthesis(), [
    ')'
  ]);
});
