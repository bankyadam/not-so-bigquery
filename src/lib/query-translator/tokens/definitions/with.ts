import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class With extends BaseToken {
  pattern = /WITH/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default With.compile();
