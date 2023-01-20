import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Case extends BaseToken {
  pattern = /CASE/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Case.compile();
