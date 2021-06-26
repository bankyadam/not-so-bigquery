'use strict';
const fs = require('fs');
const moment = require('moment-timezone');

const runTestCase = require('./runTestCase');
const { NOT_ORDERED } = runTestCase.EXPECTATIONS;

require.extensions['.txt'] = function(module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};

describe('SQL Function support', function() {
  /* eslint-disable max-len */
  it('set operator', runTestCase(require('./testcases/set-operator.txt'), NOT_ORDERED));

  context('Conversion functions', function() {
    it('cast numeric string to int64', runTestCase(require('./testcases/conversion_functions/cast-numeric-string-to-int64.txt')));
    it.skip('cast hex string to int64', runTestCase(require('./testcases/conversion_functions/cast-hex-string-to-int64.txt')));
  });

  context('Operators', function() {
    it('unnest', runTestCase(require('./testcases/operators/unnest.txt')));
  });

  context('Data types', function() {
    it('date_types', runTestCase(require('./testcases/data_types/date_types.txt')));
    it.skip('date_types_not_supported', runTestCase(require('./testcases/data_types/date_types_not_supported.txt')));
  });

  context('Aggregator functions', function() {
    describe('avg', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/avg/avg.txt')));
      it('distinct', runTestCase(require('./testcases/aggregate_functions/avg/avg_distinct.txt')));
      it('window', runTestCase(require('./testcases/aggregate_functions/avg/avg_window.txt')));
    });

    it('bit_and', runTestCase(require('./testcases/aggregate_functions/bit_and.txt')));
    it('bit_or', runTestCase(require('./testcases/aggregate_functions/bit_or.txt')));

    describe('count', function() {
      it('distinct', runTestCase(require('./testcases/aggregate_functions/count/count_distinct.txt')));
      it('null', runTestCase(require('./testcases/aggregate_functions/count/count_null.txt'), NOT_ORDERED));
      it.skip('window', runTestCase(require('./testcases/aggregate_functions/count/count_window.txt')));
    });

    describe('countif', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/countif/countif.txt')));
      it.skip('window function', runTestCase(require('./testcases/aggregate_functions/countif/countif_window.txt')));
    });

    it('logical_and', runTestCase(require('./testcases/aggregate_functions/logical_and.txt')));
    it('logical_or', runTestCase(require('./testcases/aggregate_functions/logical_or.txt')));

    describe('max', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/max/max.txt')));
      it('window function', runTestCase(require('./testcases/aggregate_functions/max/max_window.txt'), NOT_ORDERED));
    });

    describe('min', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/min/min.txt')));
      it('window function', runTestCase(require('./testcases/aggregate_functions/min/min_window.txt'), NOT_ORDERED));
    });

    describe('string_agg', function() {
      it('no delimiter', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-no_delimiter.txt')));
      it('with delimiter', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-with_delimiter.txt')));
      it('distinct', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-distinct.txt')));
      it('order by', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-order_by.txt')));
      it('limit', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-limit.txt')));
      it('order by with limit', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-order_by_with_limit.txt')));
      it('window', runTestCase(require('./testcases/aggregate_functions/string_agg/string_agg-window.txt')));
    });

    describe('array_agg', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg.txt')));
      it('distinct', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-distinct.txt')));
      it('ignore nulls', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-ignore-nulls.txt')));
      it('order by', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-order_by.txt')));
      it('limit', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-limit.txt')));
      it('complex', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-complex.txt')));
      it('window', runTestCase(require('./testcases/aggregate_functions/array_agg/array_agg-window.txt'), NOT_ORDERED));
    });

    describe('sum', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/sum/sum.txt')));
      it('distinct', runTestCase(require('./testcases/aggregate_functions/sum/sum-distinct.txt')));
      it('window', runTestCase(require('./testcases/aggregate_functions/sum/sum-window.txt')));
      it.skip('distinct with window', runTestCase(require('./testcases/aggregate_functions/sum/sum-distinct_window.txt')));
      it('null', runTestCase(require('./testcases/aggregate_functions/sum/sum-null.txt')));
    });

    describe('any_value', function() {
      it('simple', runTestCase(require('./testcases/aggregate_functions/any_value/any_value.txt')));
      it('window', runTestCase(require('./testcases/aggregate_functions/any_value/any_value-window.txt'), NOT_ORDERED));
    });
  });

  context('Date functions', function() {
    it('current_date without timezone', runTestCase(require('./testcases/date_functions/current_date-without-tz.txt')));

    it('extract day', runTestCase(require('./testcases/date_functions/extract-day.txt')));

    it('date', runTestCase(require('./testcases/date_functions/date.txt')));

    it('date_add', runTestCase(require('./testcases/date_functions/date_add.txt')));
    it('date_sub', runTestCase(require('./testcases/date_functions/date_sub.txt')));
    it('date_diff', runTestCase(require('./testcases/date_functions/date_diff.txt')));
    it('date_trunc', runTestCase(require('./testcases/date_functions/date_trunc.txt')));
    it('format_date', runTestCase(require('./testcases/date_functions/format_date.txt')));
  });

  context('Time functions', function() {
    it('current_time', runTestCase(
      require('./testcases/time_functions/current_time.txt'),
      // eslint-disable-next-line no-unused-vars
      function(currentData, expectedData) {
        expect(currentData[0].the_time).to.match(/^\d{2}:\d{2}:\d{2}.\d{6}$/);
      }
    ));
    it('time', runTestCase(require('./testcases/time_functions/time.txt')));
    it('extract', runTestCase(require('./testcases/time_functions/extract.txt')));
    it('time_diff', runTestCase(require('./testcases/time_functions/time_diff.txt')));
  });

  context('Timestamp functions', function() {
    it('current_timestamp', runTestCase(
      require('./testcases/timestamp_functions/current_timestamp.txt'),
      // eslint-disable-next-line no-unused-vars
      function(currentData, expectedData) {
        const patternForNowTimestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:[\\d{2}\\.\\d+Z]');
        expect(currentData[0].now).to.match(new RegExp(patternForNowTimestamp));
      }
    ));

    it('timestamp', runTestCase(require('./testcases/timestamp_functions/timestamp.txt')));
  });

  context('JSON functions', function() {
    it('to_json_string', runTestCase(require('./testcases/json_functions/to_json_string.txt')));
  });
});
