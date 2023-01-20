import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Struct extends BaseToken {
  pattern = /STRUCT/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Struct.compile();

