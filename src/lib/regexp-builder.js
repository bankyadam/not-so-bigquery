'use strict';
const XRegExp = require('xregexp');

const fragments = {};

const addFragment = (name, def) => {
  fragments[name] = XRegExp.build(def, fragments);
};

const buildPattern = (def, flags) => XRegExp.build(def, fragments, flags);

module.exports = { addFragment, buildPattern };
