import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class SelectAll extends BaseToken {
  pattern = /ALL/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default SelectAll.compile();
