import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class And extends BaseToken {
  pattern = /AND/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default And.compile();
