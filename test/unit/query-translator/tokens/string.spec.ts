import testTokenImages from './_test-token-image';
import { String } from '../../../../src/lib/query-translator/tokens/definitions/string';

describe('STRING token', function() {
  testTokenImages(new String(), [
    /* eslint-disable quotes */
    `"string"`,
    `"string with ' in it"`,
    `"string \\"quoted\\" inside"`,
    `'string'`,
    `'string with " in it'`,
    `'string \\'quoted\\' inside'`,
    `'''multi
line
string'''`,
    `'''can contain (') in it'''`,
    `'''can contain (") in it'''`,
    `"""can contain (") in it"""`,
    `"""can contain (') in it"""`
    /* eslint-enable quotes */
  ]);
});
