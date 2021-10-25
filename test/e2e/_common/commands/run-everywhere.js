'use strict';

const bqReal = require('../connection-real');
const bqFake = require('../connection-fake');

module.exports = async function(fn, ...args) {
  return [
    await fn(bqReal, args),
    await fn(bqFake, args)
  ];
};
