'use strict';

const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');

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
