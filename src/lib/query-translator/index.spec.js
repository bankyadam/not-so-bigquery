/* eslint-disable max-len */

'use strict';

const subject = require('./index');

describe('Query Translator', function() {
  describe('select expression', function() {
    it('simple query', function() {
      expect(subject('SELECT 1')).to.be.eql('SELECT 1');
    });

    it('handling asterisk as expression', function() {
      expect(subject('SELECT *'))
        .to.be.eql('SELECT *');
    });

    it('handling one fieldname', function() {
      expect(subject('SELECT field'))
        .to.be.eql('SELECT field');
    });

    it('handling more fieldnames', function() {
      expect(subject('SELECT f1, f2, f3'))
        .to.be.eql('SELECT f1, f2, f3');
    });

    it('handling mixed expressions', function() {
      expect(subject('SELECT 1, f2, *, f4'))
        .to.be.eql('SELECT 1, f2, *, f4');
    });

    it('SELECT DISTINCT', function() {
      expect(subject('SELECT DISTINCT f1, f2'))
        .to.be.eql('SELECT DISTINCT f1, f2');
    });

    it('SELECT ALL', function() {
      expect(subject('SELECT ALL f1, f2'))
        .to.be.eql('SELECT ALL f1, f2');
    });

    it('rejects SELECT ALL DISTINCT', function() {
      expect(subject('SELECT ALL DISTINCT f1, f2'))
        .to.be.undefined;
    });
  });

  describe('from clause', function() {
    describe('dataset handling', function() {
      it('converts project.dataset to project__dataset', function() {
        expect(subject('SELECT 1 FROM project.dataset.table', 'defaultProject'))
          .to.be.eql('SELECT 1 FROM project__dataset.table');
      });

      it('table identifier without projectId uses default project id', function() {
        expect(subject('SELECT 1 FROM dataset.tablename', 'defaultProject'))
          .to.be.eql('SELECT 1 FROM defaultProject__dataset.tablename');
      });
    });

    describe('table alias', function() {
      it('handles alias', function() {
        expect(subject('SELECT 1 FROM p.d.t alias'))
          .to.be.eql('SELECT 1 FROM p__d.t AS alias');
      });

      it('handles AS alias', function() {
        expect(subject('SELECT 1 FROM p.d.t AS alias'))
          .to.be.eql('SELECT 1 FROM p__d.t AS alias');
      });
    });
  });

  describe('group by clause', function() {
    it('handles one expression', function() {
      expect(subject('SELECT 1 FROM p.d.t GROUP BY fieldname'))
        .to.be.eql('SELECT 1 FROM p__d.t GROUP BY fieldname');
    });

    it('handles more expressions', function() {
      expect(subject('SELECT 1 FROM p.d.t GROUP BY f1, f2'))
        .to.be.eql('SELECT 1 FROM p__d.t GROUP BY f1, f2');
    });
  });

  describe('order by clause', function() {
    it('handles one field', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname');
    });

    it('handles more fields', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname1, fieldname2'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname1, fieldname2');
    });

    it('handles a field ASC', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname ASC'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname ASC');
    });

    it('handles a field DESC', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname DESC'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname DESC');
    });

    it('handles more fields ASC/DESC', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname ASC, fieldname2 DESC'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname ASC, fieldname2 DESC');
    });

    it('handles NULLS FIRST', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname NULLS FIRST'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname NULLS FIRST');
    });

    it('handles NULLS LAST', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname NULLS LAST'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname NULLS LAST');
    });

    it('handles complex definition', function() {
      expect(subject('SELECT * FROM p.d.t ORDER BY fieldname DESC NULLS LAST, fieldname2 NULLS FIRST'))
        .to.be.eql('SELECT * FROM p__d.t ORDER BY fieldname DESC NULLS LAST, fieldname2 NULLS FIRST');
    });
  });

  describe('limit clause', function() {
    it('only limit', function() {
      expect(subject('SELECT 1 FROM p.d.t LIMIT 1234'))
        .to.be.eql('SELECT 1 FROM p__d.t LIMIT 1234');
    });

    it('limit with offset', function() {
      expect(subject('SELECT 1 FROM p.d.t LIMIT 1234 OFFSET 5678'))
        .to.be.eql('SELECT 1 FROM p__d.t LIMIT 1234 OFFSET 5678');
    });
  });

  describe('special cases', function() {
    it('translates', function() {
      const query = '\n    SELECT\n          simple_string_field, simple_integer_field\n    FROM\n        testing_2346494.test_table_2346494\n    ORDER BY\n            simple_boolean_field ASC,\n            simple_integer_field DESC\n  ';
      expect(subject(query, 'project_name'))
        .to.be.eql('SELECT simple_string_field, simple_integer_field FROM project_name__testing_2346494.test_table_2346494 ORDER BY simple_boolean_field ASC, simple_integer_field DESC');
    });
  });
});
