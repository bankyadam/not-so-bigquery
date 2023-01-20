import testTokenImages from './_test-token-image';
import { SetOperator } from '../../../../src/lib/query-translator/tokens/definitions/set-operator';

describe('SET OPERATOR token', function() {
  testTokenImages(new SetOperator(), [
    'UNION',
    'union all',
    'UNION DISTINCT',
    'intersect',
    'INTERSECT DISTINCT',
    'except',
    'EXCEPT DISTINCT'
  ]);
});
