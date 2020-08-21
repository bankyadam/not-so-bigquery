const etag = require('etag');
const BaseResponseObject = require('./baseResponse');

module.exports = class BaseEntityResponseObject extends BaseResponseObject {
  get TYPE() { return 'baseEntity'; }

  compose() {
    throw new Error('Not implemented');
  }

  toJSON() {
    let response = BaseResponseObject.prototype.toJSON.call(this);
    response = { ...this.compose(), ...response };

    return {
      ...response,
      etag: this._generateETag(response)
    }
  }

  _generateETag(content) {
    return Buffer.from(JSON.parse(etag(JSON.stringify(content)))).toString('base64');
  }
}
