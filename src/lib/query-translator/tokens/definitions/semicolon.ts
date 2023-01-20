import { BaseToken } from '../baseToken';
import { Lexer } from 'chevrotain';

export class Semicolon extends BaseToken {
  pattern = /;/
  group = Lexer.SKIPPED
}

export default Semicolon.compile();
