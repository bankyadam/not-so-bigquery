import LiteralConstant from './literal_constant';
import { BaseToken } from '../baseToken';

export class OrderByNullsLast extends BaseToken {
  pattern = /NULLS LAST/i
  longer_alt = LiteralConstant
}

export default OrderByNullsLast.compile();
