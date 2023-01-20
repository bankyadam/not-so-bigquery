import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class In extends BaseToken {
  pattern = /IN/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default In.compile();
