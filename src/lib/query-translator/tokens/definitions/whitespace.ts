import { Lexer } from 'chevrotain';
import { BaseToken } from '../baseToken';

export class WhiteSpace extends BaseToken {
  pattern = /\s+/
  group = Lexer.SKIPPED
}

export default WhiteSpace.compile();
