import { BaseToken } from '../baseToken';

export class RightParenthesis extends BaseToken {
  pattern = /\)/
}

export default RightParenthesis.compile();
