import { BaseToken } from '../baseToken';
import { addFragment, buildPattern } from '../../../regexp-builder';

addFragment('TripleQuotedString', '(\'\'\'|""")[\\n\\s\\S]+\\1');
addFragment('SingleQuotedString', '((?<![\\\\])[\'"])(?:.(?!(?<![\\\\])\\1))*.?\\1');

const pattern = buildPattern('[bB]?(?:{{TripleQuotedString}}|{{SingleQuotedString}})');

export class String extends BaseToken {
  pattern = pattern
  line_breaks = true
  start_chars_hint = ['\'', '"', 'b', 'B']
}

export default String.compile();
