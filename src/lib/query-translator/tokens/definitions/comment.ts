import { BaseToken } from '../baseToken';
import { Lexer } from 'chevrotain';
import { addFragment, buildPattern } from '../../../regexp-builder';

addFragment('WhiteSpace', '[\\s\\n]');
addFragment('Any', '[\\s\\S\\n]');
addFragment('AnyUntilNewLine', '[^\\n]*');
addFragment('SingleLineSQLStyle', '-- {{AnyUntilNewLine}}');
addFragment('SingleLineCStyle', '# {{AnyUntilNewLine}}');
addFragment('BlockStyle', '/\\*{{WhiteSpace}}({{Any}}+?{{WhiteSpace}})?\\*/');
addFragment('SingleLine', '{{SingleLineCStyle}}|{{SingleLineSQLStyle}}');

export class Comment extends BaseToken {
  pattern = buildPattern('{{SingleLine}}|{{BlockStyle}}')
  group = Lexer.SKIPPED
}

export default Comment.compile();
