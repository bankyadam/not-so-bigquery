import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class Between extends BaseToken {
  pattern = /BETWEEN/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Between.compile();
