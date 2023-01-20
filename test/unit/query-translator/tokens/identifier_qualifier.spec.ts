import testTokenImages from './_test-token-image';
import { IdentifierQualifier } from '../../../../src/lib/query-translator/tokens/definitions/identifier_qualifier';

describe('IDENTIFIER QUALIFIER token', function() {
  testTokenImages(new IdentifierQualifier(), [
    '.'
  ]);
});
