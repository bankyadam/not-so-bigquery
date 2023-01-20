import { BaseToken } from '../baseToken';

export class LeftSquareBracket extends BaseToken {
  pattern = /\[/
}

export default LeftSquareBracket.compile();
