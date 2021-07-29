'use strict';

const fields = require('../fields');

module.exports.schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_INTEGER
  ]
};

module.exports.generator = function(i) {
  return {
    [fields.FIELD_SIMPLE_STRING.name]: `long test to check ${i}`,
    [fields.FIELD_SIMPLE_INTEGER.name]: Math.round(Math.random() * 900000000 + 100000000)
  };
};
