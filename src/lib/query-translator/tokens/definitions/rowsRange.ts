import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class RowsRange extends BaseToken {
  pattern = /ROWS|RANGE/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default RowsRange.compile();
