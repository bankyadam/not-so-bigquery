import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Having extends BaseToken {
  pattern = /HAVING/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Having.compile();
