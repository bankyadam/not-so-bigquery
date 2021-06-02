'use strict';

const BaseEntityResponseObject = require('./baseEntityResponse');
const BaseResponseObject = require('./baseResponse');

describe('BaseEntityResponseObject', function() {
  it('extends BaseResponseObject', function() {
    expect(new BaseEntityResponseObject).to.be.instanceof(BaseResponseObject);
  });

  it('has proper TYPE set', function() {
    expect(new BaseEntityResponseObject).to.have.property('TYPE').that.eql('baseEntity');
  });

  context('.toJSON', function() {
    class TestResponseObject extends BaseEntityResponseObject {
      compose() {
        return { test: 'value' };
      }
    }

    const jsonObject = (new TestResponseObject).toJSON();

    it('adds data that compose() returns', function() {
      expect(jsonObject).to.have.property('test').that.eql('value');
    });

    it('adds ETAG that is computed from content', function() {
      expect(jsonObject).to.have.property('etag').that.is.eql('NGMtOTFzMHdJNVVGblIvS1M2cjNleng3V1g0NVdB');
    });
  });
});
