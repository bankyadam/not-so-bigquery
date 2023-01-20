import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class SelectDistinct extends BaseToken {
  pattern = /DISTINCT/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default SelectDistinct.compile();
