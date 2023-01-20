import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class On extends BaseToken {
  pattern = /ON/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default On.compile();
