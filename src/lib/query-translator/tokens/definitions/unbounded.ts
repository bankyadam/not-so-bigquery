import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Unbounded extends BaseToken {
  pattern = /UNBOUNDED/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Unbounded.compile();
