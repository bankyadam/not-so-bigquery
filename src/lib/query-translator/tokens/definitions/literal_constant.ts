import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class LiteralConstant extends BaseToken {
  pattern = /NULL|TRUE|FALSE/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default LiteralConstant.compile();
