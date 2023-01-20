import { BaseToken } from '../baseToken';
import AnyWord from './anyword';

export class Identifier extends BaseToken {
  name = 'Identifier'
  pattern = /[a-z_][a-z0-9_~-]*|`[\S ]+`/i
  categories = [AnyWord]
}

export default Identifier.compile();
