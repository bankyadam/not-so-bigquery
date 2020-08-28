'use strict';

const { createToken } = require('chevrotain');
const { addFragment, buildPattern } = require('../../regexp-builder');

addFragment('PlusMinus', '[-+]?');
addFragment('IntegerPart', '\\d+');
addFragment('FractionalPart', '\\.\\d+');
addFragment('FractionalPartOptional', '(\\.\\d*)?');
addFragment('ExponentPart', 'e{{PlusMinus}}\\d+');

const pattern = buildPattern(
  '{{PlusMinus}}({{IntegerPart}}{{FractionalPartOptional}}|{{FractionalPart}})({{ExponentPart}})?',
  'i'
);

module.exports = createToken({
  name: 'Numeric',
  pattern
});
