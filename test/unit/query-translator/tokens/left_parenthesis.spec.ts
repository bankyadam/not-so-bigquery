import testTokenImages from './_test-token-image';
import { LeftParenthesis } from '../../../../src/lib/query-translator/tokens/definitions/left-parenthesis';

describe('( token', function() {
  testTokenImages(new LeftParenthesis(), [
    '('
  ]);
});
