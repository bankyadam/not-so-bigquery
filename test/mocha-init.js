'use strict';

const sinon = global.sinon = require('sinon');
const chai = require('chai');
global.expect = chai.expect;
chai.use(require('sinon-chai'));
chai.use(require('chai-string'));

beforeEach(function() {
  global.sandbox = sinon.createSandbox();
});

afterEach(function() {
  global.sandbox.restore();
});
