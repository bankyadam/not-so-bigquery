import { BaseToken } from '../baseToken';

export class Comma extends BaseToken {
  pattern = /,/
}

export default Comma.compile();
