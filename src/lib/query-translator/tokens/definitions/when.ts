import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class When extends BaseToken {
  pattern = /WHEN/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default When.compile();
