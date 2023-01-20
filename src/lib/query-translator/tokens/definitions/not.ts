import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Not extends BaseToken {
  pattern = /NOT/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Not.compile();
