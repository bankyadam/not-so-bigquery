/* eslint-disable max-len */
import runExpectation from './run-expectation';

describe('Query Translator', function() {
  describe('function support', function() {
    describe('cast', function() {
      it('cast to int64', runExpectation(require('./testcases/functions/cast-int64.txt')));
    });

    describe('aggregate functions', function() {
      it('countif', runExpectation(require('./testcases/functions/aggregate/countif.txt')));
    });

    describe('date functions', function() {
      it('current_date() without timezone', runExpectation(require('./testcases/functions/date/current_date.txt')));
      it.skip('current_date() with timezone');
      it('extract() day', runExpectation(require('./testcases/functions/date/extract-day-from-date.txt')));
      it('date()', runExpectation(require('./testcases/functions/date/date.txt')));
      it('date_add()', runExpectation(require('./testcases/functions/date/date_add.txt')));
      it('date_sub()', runExpectation(require('./testcases/functions/date/date_sub.txt')));
      it('date_diff()', runExpectation(require('./testcases/functions/date/date_diff.txt')));
      it('date_trunc()', runExpectation(require('./testcases/functions/date/date_trunc.txt')));
      it('format_date()', runExpectation(require('./testcases/functions/date/format_date.txt')));
    });

    describe('time functions', function() {
      it('current_time()', runExpectation(require('./testcases/functions/time/current_time.txt')));
    });

    describe('timestamp functions', function() {
      it('current_timestamp()', runExpectation(require('./testcases/functions/timestamp/current_timestamp.txt')));
      it('timestamp without timezone', runExpectation(require('./testcases/functions/timestamp/timestamp_without_timezone.txt')));
      it('timestamp with timezone', runExpectation(require('./testcases/functions/timestamp/timestamp_with_timezone.txt')));
    });
  });
});
