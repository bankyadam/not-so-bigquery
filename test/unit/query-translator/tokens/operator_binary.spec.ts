import testTokenImages from './_test-token-image';
import { OperatorBinary } from '../../../../src/lib/query-translator/tokens/definitions/operator_binary';

describe('Binary Operators token', function() {
  testTokenImages(new OperatorBinary(), [
    'OR',
    'or',
    'IS',
    'is',
    'IS NOT',
    'is not',
    '<=',
    '<',
    '=',
    '>',
    '>=',
    '<>',
    '!='
  ]);
});
