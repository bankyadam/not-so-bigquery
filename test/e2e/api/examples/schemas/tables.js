'use strict';

const fields = require('../fields');

module.exports.schema = {
  fields: [
    fields.FIELD_SIMPLE_STRING,
    fields.FIELD_SIMPLE_STRING_WITHOUT_DESCRIPTION,
    fields.FIELD_SIMPLE_INTEGER,
    fields.FIELD_SIMPLE_INT64,
    fields.FIELD_SIMPLE_BOOLEAN,
    fields.FIELD_SIMPLE_BOOL,
    fields.FIELD_SIMPLE_FLOAT,
    fields.FIELD_SIMPLE_FLOAT64,
    fields.FIELD_SIMPLE_TIME,
    fields.FIELD_SIMPLE_DATE,
    fields.FIELD_SIMPLE_DATETIME
  ]
};
