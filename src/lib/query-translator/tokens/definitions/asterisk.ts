import { BaseToken } from '../baseToken';

export class Asterisk extends BaseToken {
  pattern = /\*/
}

export default Asterisk.compile();
