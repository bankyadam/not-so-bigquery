'use strict';

const dateAdd = require('./date/date_add');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  CURRENT_DATE: function(ctx) { return 'TO_CHAR(CURRENT_TIMESTAMP, \'YYYY-MM-DD\')'; },
  DATE: require('./date/date'),
  DATE_ADD: function(ctx) { return dateAdd.call(this, ctx, dateAdd.OPERATION_ADD); },
  DATE_SUB: function(ctx) { return dateAdd.call(this, ctx, dateAdd.OPERATION_SUB); },
  DATE_DIFF: require('./date/date_diff'),
  DATE_TRUNC: require('./date/date_trunc'),
  FORMAT_DATE: require('./date/format_date'),

  // eslint-disable-next-line no-unused-vars
  CURRENT_TIME: function(ctx) { return 'TO_CHAR(CURRENT_TIMESTAMP, \'HH24:MI:SS.US\')'; },
  TIME: require('./time/time'),
  TIME_DIFF: require('./time/time_diff'),

  COUNTIF: require('./aggregate/countif'),
  LOGICAL_AND: require('./aggregate/logical_and'),
  LOGICAL_OR: require('./aggregate/logical_or'),
  STRING_AGG: require('./aggregate/string_agg'),
  ARRAY_AGG: require('./aggregate/array_agg'),
  ANY_VALUE: require('./aggregate/any_value'),

  TO_JSON_STRING: require('./json/to_json_string')
};
