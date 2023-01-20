import { BaseToken } from '../baseToken';

export class IgnoreRespectNulls extends BaseToken {
  pattern = /(IGNORE|RESPECT) NULLS/i
}

export default IgnoreRespectNulls.compile();
