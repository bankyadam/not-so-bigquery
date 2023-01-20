import Identifier from './identifier';
import AnyWord from './anyword';
import { BaseToken } from '../baseToken';

export class OrderByDesc extends BaseToken {
  pattern = /DESC/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default OrderByDesc.compile();
