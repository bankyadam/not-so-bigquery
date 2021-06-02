'use strict';

const BaseError = require('./baseError');

describe('BaseError', function() {
  context('.toJSON', function() {
    class TestError extends BaseError {
      get errorCode() {
        return 'errorCode';
      }

      get status() {
        return 'status';
      }

      get reason() {
        return 'reason';
      }

      get message() {
        return 'message';
      }
    }

    const json = (new TestError).toJSON();

    it('returns the proper response object', function() {
      const error = json.error;
      expect(error).to.have.property('code').that.eql('errorCode');
      expect(error).to.have.property('message').that.eql('message');
      expect(error).to.have.property('status').that.eql('status');
      expect(error).to.have.property('errors').that.is.an('array').and.lengthOf(1);
      expect(error.errors[0]).to.be.eql({
        domain: 'global',
        message: 'message',
        reason: 'reason'
      });
    });

    it('adds generator property to the response object', function() {
      expect(json).to.have.property('generator').that.eql('not-so-big-query');
    });
  });
});
