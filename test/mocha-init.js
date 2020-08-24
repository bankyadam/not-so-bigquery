'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const fs = require('fs');

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

before(function() {
  global.expect = chai.expect;
  global.sinon = sinon;
  chai.use(sinonChai);
});

beforeEach(function() {
  global.sandbox = sinon.createSandbox();
});

afterEach(function() {
  global.sandbox.restore();
});
