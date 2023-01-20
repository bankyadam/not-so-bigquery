import { BaseToken } from '../baseToken';

export class Offset extends BaseToken {
  pattern = /OFFSET (0|[1-9]\d*)/i
}

export default Offset.compile()
