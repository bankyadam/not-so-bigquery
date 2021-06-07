'use strict';

const { zipObject } = require('lodash');

module.exports = function(input) {
  const rows = input.split('\n').filter(row => row[0] === '|');
  const data = rows.map(row => row.split(/\s*\|\s*/).slice(1, -1));
  const headers = data.shift();
  const forceString = headers.map((header, index) => {
    const force = header.substr(-1) === '!';
    if (force) {
      headers[index] = header.substr(0, header.length - 1);
    }
    return force;
  });

  return data.map(row => zipObject(headers, row.map(function(value, index) {
    return cast(value, forceString[index]);
  })));
};

const cast = function(value, forceString) {
  if (value === 'NULL') {
    return null;
  }

  if (value === 'TRUE') {
    return true;
  }

  if (value === 'FALSE') {
    return false;
  }

  if (forceString) {
    return value.toString();
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
