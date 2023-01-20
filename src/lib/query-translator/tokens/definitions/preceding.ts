import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Preceding extends BaseToken {
  pattern = /PRECEDING/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Preceding.compile();
