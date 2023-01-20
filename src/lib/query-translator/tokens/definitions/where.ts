import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Where extends BaseToken {
  pattern = /WHERE/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Where.compile();
