import { BaseToken } from '../baseToken';

export class NumericHex extends BaseToken {
  pattern = /0x[a-fA-F0-9]+/
}

export default NumericHex.compile();
