import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Interval extends BaseToken {
  pattern = /INTERVAL/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Interval.compile();
