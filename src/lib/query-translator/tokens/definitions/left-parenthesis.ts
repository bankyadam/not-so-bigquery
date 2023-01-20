import { BaseToken } from '../baseToken';

export class LeftParenthesis extends BaseToken {
  pattern = /\(/
}

export default LeftParenthesis.compile();
