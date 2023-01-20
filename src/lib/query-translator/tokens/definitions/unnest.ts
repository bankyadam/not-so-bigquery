import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Unnest extends BaseToken {
  pattern = /UNNEST/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Unnest.compile();
