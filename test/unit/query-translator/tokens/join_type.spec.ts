import testTokenImages from './_test-token-image';
import { JoinType } from '../../../../src/lib/query-translator/tokens/definitions/join_type';

describe('Join type token', function() {
  testTokenImages(new JoinType(), [
    'INNER',
    'inner',
    'CROSS',
    'cross',
    'FULL',
    'full',
    'FULL OUTER',
    'full outer',
    'LEFT',
    'left',
    'LEFT OUTER',
    'left outer',
    'RIGHT',
    'right',
    'RIGHT OUTER',
    'right outer'
  ]);
});
