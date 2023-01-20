import { BaseToken } from '../baseToken';

export class Backtick extends BaseToken {
  pattern = /`/
}

export default Backtick.compile();
