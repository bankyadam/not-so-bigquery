import { BaseToken } from '../baseToken';
import { addFragment, buildPattern } from '../../../regexp-builder';
import NumericHex from './numeric_hex';

addFragment('PlusMinus', '[-+]?');
addFragment('IntegerPart', '\\d+');
addFragment('FractionalPart', '\\.\\d+');
addFragment('FractionalPartOptional', '(\\.\\d*)?');
addFragment('ExponentPart', 'e{{PlusMinus}}\\d+');

const pattern = buildPattern(
  '{{PlusMinus}}({{IntegerPart}}{{FractionalPartOptional}}|{{FractionalPart}})({{ExponentPart}})?',
  'i'
);

export class Numeric extends BaseToken {
  pattern = pattern
  longer_alt = NumericHex
}

export default Numeric.compile();
