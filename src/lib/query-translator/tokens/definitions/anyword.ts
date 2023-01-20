import { BaseToken } from '../baseToken';
import { Lexer } from 'chevrotain';

export class AnyWord extends BaseToken {
  pattern = Lexer.NA
}

export default AnyWord.compile();
