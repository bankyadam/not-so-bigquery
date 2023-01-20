import BaseResponseObject from './baseResponse';
import { expect } from 'chai';

class TestResponseObject extends BaseResponseObject {
  TYPE = 'test';

  compose() {
    return {};
  }
}

describe('BaseResponseObject', function() {
  context('.toJSON', function() {
    it('returns proper data', function() {
      const data = (new TestResponseObject()).toJSON();
      expect(data).to.have.property('kind').that.eql('bigquery#test');
      expect(data).to.have.property('generator').that.eql('not-so-big-query');
    });
  });
});
