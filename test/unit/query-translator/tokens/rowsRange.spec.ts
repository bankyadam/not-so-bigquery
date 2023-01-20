import testTokenImages from './_test-token-image';
import { RowsRange } from '../../../../src/lib/query-translator/tokens/definitions/rowsRange';

describe('ROWS|RANGE token', function() {
  testTokenImages(new RowsRange(), [
    'rows', 'range',
    'ROWS', 'RANGE'
  ]);
});
