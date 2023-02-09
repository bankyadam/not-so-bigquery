import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class DateType extends BaseToken {
  pattern = /DATETIME|TIMESTAMP|DATE|TIME/i
  longer_alt = Identifier
  categories = [Identifier]
}

export default DateType.compile();
