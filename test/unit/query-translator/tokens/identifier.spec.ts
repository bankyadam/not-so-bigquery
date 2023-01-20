import testTokenImages from './_test-token-image';
import { Identifier } from '../../../../src/lib/query-translator/tokens/definitions/identifier';

describe('Identifier token', function() {
  testTokenImages(new Identifier(), [
    'Customers5',
    '`5Customers`',
    'dataField',
    '_dataField1',
    'ADGROUP',
    'table-name',
    '`tableName~`',
    '`GROUP`'
  ]);
});
