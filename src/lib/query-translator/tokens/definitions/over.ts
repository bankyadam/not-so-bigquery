import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Over extends BaseToken {
  pattern = /OVER/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Over.compile();
