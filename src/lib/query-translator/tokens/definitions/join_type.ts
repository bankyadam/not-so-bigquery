import { BaseToken } from '../baseToken';
import Identifier from './identifier';
import AnyWord from './anyword';

export class JoinType extends BaseToken {
  pattern = /INNER|CROSS|(FULL|LEFT|RIGHT)( OUTER)?/i
  longer_alt = Identifier
  categories = [AnyWord]
}

export default JoinType.compile();
