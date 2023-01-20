import { BaseToken } from '../baseToken';

export class AtCharacter extends BaseToken {
  pattern = /@/
}

export default AtCharacter.compile();
