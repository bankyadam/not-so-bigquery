import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class PartitionBy extends BaseToken {
  pattern = /PARTITION BY/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default PartitionBy.compile();
