import Identifier from './identifier';
import AnyWord from './anyword';
import { BaseToken } from '../baseToken';

export class GroupBy extends BaseToken {
  pattern = /GROUP BY/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default GroupBy.compile();
