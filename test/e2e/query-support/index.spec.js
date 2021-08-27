'use strict';
const moment = require('moment-timezone');

const runTestCaseFactory = require('./runTestCase');
const runTestCase = runTestCaseFactory(__dirname);
const { NOT_ORDERED } = runTestCaseFactory.EXPECTATIONS;

describe('SQL Function support', function() {
  /* eslint-disable max-len */
  it('set operator', runTestCase('testcases/set-operator.txt', NOT_ORDERED));

  context('Conversion functions', function() {
    it('cast numeric string to int64', runTestCase('testcases/conversion_functions/cast-numeric-string-to-int64.txt'));
    it.skip('cast hex string to int64', runTestCase('testcases/conversion_functions/cast-hex-string-to-int64.txt'));
  });

  context('Operators', function() {
    it('unnest', runTestCase('testcases/operators/unnest.txt'));
  });

  context('Data types', function() {
    it('date_types', runTestCase('testcases/data_types/date_types.txt'));
    it.skip('date_types_not_supported', runTestCase('testcases/data_types/date_types_not_supported.txt'));
  });

  context('Aggregator functions', function() {
    describe('avg', function() {
      it('simple', runTestCase('testcases/aggregate_functions/avg/avg.txt'));
      it('distinct', runTestCase('testcases/aggregate_functions/avg/avg_distinct.txt'));
      it('window', runTestCase('testcases/aggregate_functions/avg/avg_window.txt'));
    });

    it('bit_and', runTestCase('testcases/aggregate_functions/bit_and.txt'));
    it('bit_or', runTestCase('testcases/aggregate_functions/bit_or.txt'));

    describe('count', function() {
      it('distinct', runTestCase('testcases/aggregate_functions/count/count_distinct.txt'));
      it('null', runTestCase('testcases/aggregate_functions/count/count_null.txt', NOT_ORDERED));
      it.skip('window', runTestCase('testcases/aggregate_functions/count/count_window.txt'));
    });

    describe('countif', function() {
      it('simple', runTestCase('testcases/aggregate_functions/countif/countif.txt'));
      it.skip('window function', runTestCase('testcases/aggregate_functions/countif/countif_window.txt'));
    });

    it('logical_and', runTestCase('testcases/aggregate_functions/logical_and.txt'));
    it('logical_or', runTestCase('testcases/aggregate_functions/logical_or.txt'));

    describe('max', function() {
      it('simple', runTestCase('testcases/aggregate_functions/max/max.txt'));
      it('window function', runTestCase('testcases/aggregate_functions/max/max_window.txt', NOT_ORDERED));
    });

    describe('min', function() {
      it('simple', runTestCase('testcases/aggregate_functions/min/min.txt'));
      it('window function', runTestCase('testcases/aggregate_functions/min/min_window.txt', NOT_ORDERED));
    });

    describe('string_agg', function() {
      it('no delimiter', runTestCase('testcases/aggregate_functions/string_agg/string_agg-no_delimiter.txt'));
      it('with delimiter', runTestCase('testcases/aggregate_functions/string_agg/string_agg-with_delimiter.txt'));
      it('distinct', runTestCase('testcases/aggregate_functions/string_agg/string_agg-distinct.txt'));
      it('order by', runTestCase('testcases/aggregate_functions/string_agg/string_agg-order_by.txt'));
      it('limit', runTestCase('testcases/aggregate_functions/string_agg/string_agg-limit.txt'));
      it('order by with limit', runTestCase('testcases/aggregate_functions/string_agg/string_agg-order_by_with_limit.txt'));
      it('window', runTestCase('testcases/aggregate_functions/string_agg/string_agg-window.txt'));
    });

    describe('array_agg', function() {
      it('simple', runTestCase('testcases/aggregate_functions/array_agg/array_agg.txt'));
      it('distinct', runTestCase('testcases/aggregate_functions/array_agg/array_agg-distinct.txt'));
      it('ignore nulls', runTestCase('testcases/aggregate_functions/array_agg/array_agg-ignore-nulls.txt'));
      it('order by', runTestCase('testcases/aggregate_functions/array_agg/array_agg-order_by.txt'));
      it('limit', runTestCase('testcases/aggregate_functions/array_agg/array_agg-limit.txt'));
      it('complex', runTestCase('testcases/aggregate_functions/array_agg/array_agg-complex.txt'));
      it('window', runTestCase('testcases/aggregate_functions/array_agg/array_agg-window.txt', NOT_ORDERED));
    });

    describe('sum', function() {
      it('simple', runTestCase('testcases/aggregate_functions/sum/sum.txt'));
      it('distinct', runTestCase('testcases/aggregate_functions/sum/sum-distinct.txt'));
      it('window', runTestCase('testcases/aggregate_functions/sum/sum-window.txt'));
      it.skip('distinct with window', runTestCase('testcases/aggregate_functions/sum/sum-distinct_window.txt'));
      it('null', runTestCase('testcases/aggregate_functions/sum/sum-null.txt'));
    });

    describe('any_value', function() {
      it('simple', runTestCase('testcases/aggregate_functions/any_value/any_value.txt'));
      it('window', runTestCase('testcases/aggregate_functions/any_value/any_value-window.txt', NOT_ORDERED));
    });
  });

  context('Date functions', function() {
    it('current_date without timezone', runTestCase('testcases/date_functions/current_date-without-tz.txt'));

    it('extract day', runTestCase('testcases/date_functions/extract-day.txt'));

    it('date', runTestCase('testcases/date_functions/date.txt'));

    it('date_add', runTestCase('testcases/date_functions/date_add.txt'));
    it('date_sub', runTestCase('testcases/date_functions/date_sub.txt'));
    it('date_diff', runTestCase('testcases/date_functions/date_diff.txt'));
    it('date_trunc', runTestCase('testcases/date_functions/date_trunc.txt'));
    it('format_date', runTestCase('testcases/date_functions/format_date.txt'));
  });

  context('Time functions', function() {
    it('current_time', runTestCase(
      './testcases/time_functions/current_time.txt',
      // eslint-disable-next-line no-unused-vars
      function(currentData, expectedData) {
        expect(currentData[0].the_time).to.match(/^\d{2}:\d{2}:\d{2}.\d{6}$/);
      }
    ));
    it('time', runTestCase('testcases/time_functions/time.txt'));
    it('extract', runTestCase('testcases/time_functions/extract.txt'));
    it('time_diff', runTestCase('testcases/time_functions/time_diff.txt'));
  });

  context('Timestamp functions', function() {
    it('current_timestamp', runTestCase(
      './testcases/timestamp_functions/current_timestamp.txt',
      // eslint-disable-next-line no-unused-vars
      function(currentData, expectedData) {
        const patternForNowTimestamp = moment().utc().format('YYYY-MM-DD[T]HH:mm:[\\d{2}\\.\\d+Z]');
        expect(currentData[0].now).to.match(new RegExp(patternForNowTimestamp));
      }
    ));

    it('timestamp', runTestCase('testcases/timestamp_functions/timestamp.txt'));
  });

  context('JSON functions', function() {
    it('to_json_string', runTestCase('testcases/json_functions/to_json_string.txt'));
  });
});
