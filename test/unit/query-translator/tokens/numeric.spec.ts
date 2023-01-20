import testTokenImages from './_test-token-image';
import { Numeric } from '../../../../src/lib/query-translator/tokens/definitions/numeric';

describe('NUMERIC token', function() {
  testTokenImages(new Numeric(), [
    '0',
    '1',
    '123',
    '.0123',
    '123.',
    '+112',
    '-112',
    '-.113',
    '+.123',
    '123E123',
    '123E-12',
    '123E+12',
    '123e123',
    '123e-12',
    '123e+12'
  ]);
});
