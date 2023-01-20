import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Cast extends BaseToken {
  pattern = /CAST/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Cast.compile();
