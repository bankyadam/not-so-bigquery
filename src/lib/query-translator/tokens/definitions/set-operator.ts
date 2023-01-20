import { BaseToken } from '../baseToken';

export class SetOperator extends BaseToken {
  pattern = /UNION( (ALL|DISTINCT))?|INTERSECT( DISTINCT)?|EXCEPT( DISTINCT)?/i
}

export default SetOperator.compile();
