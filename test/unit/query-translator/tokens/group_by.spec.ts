import testTokenImages from './_test-token-image';
import { GroupBy } from '../../../../src/lib/query-translator/tokens/definitions/group_by';

describe('GROUP BY token', function() {
  testTokenImages(new GroupBy(), [
    'group by',
    'GROUP BY'
  ]);
});
