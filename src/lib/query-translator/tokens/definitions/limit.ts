import { BaseToken } from '../baseToken';

export class Limit extends BaseToken {
  pattern = /LIMIT/i
}

export default Limit.compile();
