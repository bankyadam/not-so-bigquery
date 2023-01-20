import testTokenImages from './_test-token-image';
import { Comment } from '../../../../src/lib/query-translator/tokens/definitions/comment';

describe('Comment token', function() {
  testTokenImages(new Comment(), [
    '-- comment',
    '# comment',
    '/* comment */',
    `/* multi line
comment */`,
    `/*
*/`,
    `/*
multi line comment
*/`
  ]);
});
