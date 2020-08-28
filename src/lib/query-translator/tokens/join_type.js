'use strict';

const { createToken } = require('chevrotain');
const Identifier = require('./identifier');

module.exports = createToken({
  name: 'JoinType',
  pattern: /INNER|CROSS|(FULL|LEFT|RIGHT)( OUTER)?/i,
  longer_alt: Identifier
});
