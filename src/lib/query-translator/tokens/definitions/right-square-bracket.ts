import { BaseToken } from '../baseToken';

export class RightSquareBracket extends BaseToken {
  pattern = /\]/
}

export default RightSquareBracket.compile();
