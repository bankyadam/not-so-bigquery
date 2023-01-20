import { Asterisk } from '../../../../src/lib/query-translator/tokens/definitions/asterisk';
import testTokenImages from './_test-token-image';

describe('* token', function() {
  testTokenImages(new Asterisk(), ['*']);
});
