'use strict';

const sinon = global.sinon = require('sinon');
const chai = require('chai');
global.expect = chai.expect;
chai.use(require('sinon-chai'));
chai.use(require('chai-string'));

const fs = require('fs');
require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

beforeEach(function() {
  global.sandbox = sinon.createSandbox();
});

afterEach(function() {
  global.sandbox.restore();
});
