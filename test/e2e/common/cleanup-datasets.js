'use strict';

const bqReal = require('./connection-real');
const bqFake = require('./connection-fake');

module.exports = async function cleanUp(dataasetId) {
  try {
    await bqReal.dataset(dataasetId).delete({ force: true });
  } catch (e) {
    // eslint-disable-next-line no-empty
  }

  try {
    await bqFake.dataset(dataasetId).delete({ force: true });
  } catch (e) {
    // eslint-disable-next-line no-empty
  }
};
