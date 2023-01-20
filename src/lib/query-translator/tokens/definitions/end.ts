import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class End extends BaseToken {
  pattern = /END/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default End.compile();
