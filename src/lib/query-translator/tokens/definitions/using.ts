import Identifier from './identifier';
import AnyWord from './anyword';
import { BaseToken } from '../baseToken';

export class Using extends BaseToken {
  pattern = /USING/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Using.compile();
