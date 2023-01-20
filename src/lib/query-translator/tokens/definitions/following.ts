import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Following extends BaseToken {
  pattern = /FOLLOWING/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Following.compile();
