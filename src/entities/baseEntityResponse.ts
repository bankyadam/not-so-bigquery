import etag from 'etag';
import BaseResponse from './baseResponse';

abstract class BaseEntityResponse extends BaseResponse {
  toJSON() {
    let response = super.toJSON();
    const entityResponse = this.compose();
    response = { ...entityResponse, ...response };

    return {
      ...response,
      etag: this._generateETag(response)
    };
  }

  _generateETag(content) {
    return Buffer.from(etag(JSON.stringify(content))).toString('base64');
  }
}

export default BaseEntityResponse;
