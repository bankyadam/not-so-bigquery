import testTokenImages from './_test-token-image';
import { NumericHex } from '../../../../src/lib/query-translator/tokens/definitions/numeric_hex';

describe('NUMERIC_HEX token', function() {
  testTokenImages(new NumericHex(), [
    '0x1234',
    '0xabcdef',
    '0xABCDEF'
  ]);
});
