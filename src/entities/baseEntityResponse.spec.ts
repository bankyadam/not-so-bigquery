import BaseEntityResponse from './baseEntityResponse';
import BaseResponse from './baseResponse';
import { expect } from 'chai';

class TestResponseObject extends BaseEntityResponse {
  TYPE = 'TEST';

  compose() {
    return { test: 'value' };
  }
}

describe('BaseEntityResponseObject', function() {
  it('extends BaseResponseObject', function() {
    expect(new TestResponseObject()).to.be.instanceof(BaseResponse);
  });

  it('has proper TYPE set', function() {
    expect(new TestResponseObject()).to.have.property('TYPE').that.eql('TEST');
  });

  context('.toJSON', function() {
    const jsonObject = (new TestResponseObject).toJSON();

    it('adds data that compose() returns', function() {
      expect(jsonObject).to.have.property('test').that.eql('value');
    });

    it('adds ETAG that is computed from content', function() {
      expect(jsonObject).to.have.property('etag').that.is.eql('IjQ2LTNuR3JwVkNaTWR5aUNacm4wTTh3NWVNcDNEWSI=');
    });
  });
});
