import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class CurrentRow extends BaseToken {
  pattern = /CURRENT ROW/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default CurrentRow.compile();
