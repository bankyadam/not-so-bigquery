import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class OrderByAsc extends BaseToken {
  pattern = /ASC/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default OrderByAsc.compile();
