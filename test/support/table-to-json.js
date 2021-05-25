'use strict';

const { zipObject } = require('lodash');

module.exports = function(input) {
  const rows = input.split('\n').filter(row => row[0] === '|');
  const data = rows.map(row => row.split(/\s*\|\s*/).slice(1, -1));
  const headers = data.shift();

  return data.map(row => zipObject(headers, row.map(cast)));
};

function cast(value) {
  if (value === 'NULL') {
    return null;
  }

  if (value === 'TRUE') {
    return true;
  }

  if (value === 'FALSE') {
    return false;
  }

  const numeric = parseFloat(value);
  if (!isNaN(numeric)) {
    return numeric;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
}
