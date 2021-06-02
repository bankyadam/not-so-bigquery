'use strict';

const BaseResponseObject = require('./baseResponse');

describe('BaseResponseObject', function() {
  it('has proper TYPE set', function() {
    expect(new BaseResponseObject).to.have.property('TYPE').that.eql('base');
  });

  context('.toJSON', function() {
    it('returns proper data', function() {
      const data = (new BaseResponseObject()).toJSON();
      expect(data).to.have.property('kind').that.eql('bigquery#base');
      expect(data).to.have.property('generator').that.eql('not-so-big-query');
    });
  });
});
