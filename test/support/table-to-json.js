'use strict';

const { zipObject } = require('lodash');
const TYPES = {
  STRING: 'string',
  ARRAY: 'array',
  UNKNOWN: 'unknown'
};

module.exports = function(input) {
  const rows = input.split('\n').filter(row => row[0] === '|');
  const data = rows.map(row => row.split(/\s*\|\s*/).slice(1, -1));
  const headers = [];
  const headerTypes = [];

  const addHeader = function(name, type) {
    headers.push(name);
    headerTypes.push(type);
  };

  data.shift().forEach(headerName => {
    let matches;
    if (matches = /(.+)\[]$/.exec(headerName)) {
      addHeader(matches[1], TYPES.ARRAY);
    } else if (matches = /(.+)\!$/.exec(headerName)) {
      addHeader(matches[1], TYPES.STRING);
    } else {
      addHeader(headerName, TYPES.UNKNOWN);
    }
  });

  return data.map(row => zipObject(headers, row.map(function(value, index) {
    return cast(value, headerTypes[index]);
  })));
};

const cast = function(value, type) {
  if (value === 'NULL') {
    return null;
  }

  if (value === 'TRUE') {
    return true;
  }

  if (value === 'FALSE') {
    return false;
  }

  if (type === TYPES.STRING) {
    return value.toString();
  }

  if (type === TYPES.ARRAY) {
    return JSON.parse(value).map(cast);
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};
