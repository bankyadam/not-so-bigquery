import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class From extends BaseToken {
  pattern = /FROM/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default From.compile();
