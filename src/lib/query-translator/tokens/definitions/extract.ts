import Identifier from './identifier';
import AnyWord from './anyword';
import { BaseToken } from '../baseToken';

export class Extract extends BaseToken {
  pattern = /EXTRACT/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default Extract.compile();
