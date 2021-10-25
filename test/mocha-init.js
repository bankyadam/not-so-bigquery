'use strict';
const fs = require('fs');

const sinon = global.sinon = require('sinon');
const chai = require('chai');
global.expect = chai.expect;
chai.use(require('sinon-chai'));
chai.use(require('chai-string'));

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

beforeEach(function() {
  global.sandbox = sinon.createSandbox();
});

afterEach(function() {
  global.sandbox.restore();
});

// Aliases
describe.notComplete = describe.skip;
it.notComplete = it.skip;
