import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Then extends BaseToken {
  pattern = /THEN/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Then.compile();
