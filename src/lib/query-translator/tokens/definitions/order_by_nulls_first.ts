import { BaseToken } from '../baseToken';
import LiteralConstant from './literal_constant';

export class OrderByNullsFirst extends BaseToken {
  pattern = /NULLS FIRST/i
  longer_alt = LiteralConstant
}

export default OrderByNullsFirst.compile();
