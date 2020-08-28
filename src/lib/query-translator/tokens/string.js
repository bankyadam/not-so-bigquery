'use strict';

const { createToken } = require('chevrotain');
const { addFragment, buildPattern } = require('../../regexp-builder');

addFragment('TripleQuotedString', '(\'\'\'|""")[\\n\\s\\S]+\\1');
addFragment('SingleQuotedString', '((?<![\\\\])[\'"])(?:.(?!(?<![\\\\])\\1))*.?\\1');

const pattern = buildPattern('{{TripleQuotedString}}|{{SingleQuotedString}}');

module.exports = createToken({
  name: 'String',
  pattern,
  line_breaks: true,
  start_chars_hint: ['\'', '"']
});
