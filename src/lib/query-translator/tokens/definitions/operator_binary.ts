import { BaseToken } from '../baseToken';
import Identifier from './identifier';

export class OperatorBinary extends BaseToken {
  pattern = /IS NOT|IS|OR|<=|>=|<>|!=|<|=|>/i
  longer_alt = Identifier
}

export default OperatorBinary.compile();
