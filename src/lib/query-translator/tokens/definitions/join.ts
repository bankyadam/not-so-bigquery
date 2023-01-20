import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Join extends BaseToken {
  pattern = /JOIN/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Join.compile();
