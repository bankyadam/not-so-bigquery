import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Else extends BaseToken {
  pattern = /ELSE/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Else.compile();
