'use strict';

const subject = require('./headers');

describe('Headers Middleware', function() {
  let response;
  let next;

  beforeEach(function() {
    response = {
      headers: {},
      set: function(headers) {
        this.headers = headers;
      }
    };
    next = sandbox.spy();
  });

  it('sets all required headers', function() {
    subject(null, response, next);

    expect(response.headers['x-content-type-options']).to.be.eql('nosniff');
    expect(response.headers['x-frame-options']).to.be.eql('SAMEORIGIN');
    expect(response.headers['x-xss-protection']).to.be.eql('0');
  });

  it('continues execution', function() {
    subject(null, response, next);

    expect(next).to.be.calledOnce;
  });
});
