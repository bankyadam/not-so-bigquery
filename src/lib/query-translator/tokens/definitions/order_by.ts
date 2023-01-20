import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class OrderBy extends BaseToken {
  pattern = /ORDER BY/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default OrderBy.compile();
