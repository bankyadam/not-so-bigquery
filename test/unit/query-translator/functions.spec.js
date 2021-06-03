'use strict';
const runExpectation = require('./run-expectation');

describe('Query Translator', function() {

  describe('function support', function() {

    describe('cast', function() {
      it('cast to int64', runExpectation(require('./testcases/functions/cast-int64.txt')));
    });

    describe('current_date', function() {
      it('without timezone', runExpectation(require('./testcases/functions/current_date.txt')));
      it.skip('with timezone');
    });

    describe('extract', function() {
      it('day', runExpectation(require('./testcases/functions/extract-day-from-date.txt')));
    });

    describe('date', function() {
      it('date', runExpectation(require('./testcases/functions/date.txt')));
    });
  });
});
