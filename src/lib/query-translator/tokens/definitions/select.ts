import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Select extends BaseToken {
  pattern = /SELECT/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Select.compile();
