import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class As extends BaseToken {
  pattern = /AS/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default As.compile();
