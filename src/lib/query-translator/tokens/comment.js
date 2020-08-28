'use strict';

const { Lexer, createToken } = require('chevrotain');
const { addFragment, buildPattern } = require('../../regexp-builder');

addFragment('WhiteSpace', '[\\s\\n]');
addFragment('Any', '[\\s\\S\\n]');
addFragment('AnyUntilNewLine', '[^\\n]*');
addFragment('SingleLineSQLStyle', '-- {{AnyUntilNewLine}}');
addFragment('SingleLineCStyle', '# {{AnyUntilNewLine}}');
addFragment('BlockStyle', '/\\*{{WhiteSpace}}({{Any}}+?{{WhiteSpace}})?\\*/');
addFragment('SingleLine', '{{SingleLineCStyle}}|{{SingleLineSQLStyle}}');

module.exports = createToken({
  name: 'Comment',
  pattern: buildPattern('{{SingleLine}}|{{BlockStyle}}'),
  group: Lexer.SKIPPED
});
