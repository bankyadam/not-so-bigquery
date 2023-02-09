import testTokenImages from './_test-token-image';
import { DateType } from '../../../../src/lib/query-translator/tokens/definitions/date_type';

describe('DATE_TYPE token', function() {
  testTokenImages(new DateType(), [
    'date',
    'DATE',
    'datetime',
    'DATETIME',
    'time',
    'TIME',
    'timestamp',
    'TIMESTAMP'
  ]);
});
