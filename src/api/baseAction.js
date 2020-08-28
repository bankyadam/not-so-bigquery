'use strict';

class ResponseSent extends Error {
}

class BaseAction {
  constructor(req, res) {
    this._req = req;
    this._res = res;
  }

  async perform() {
    this._sendResponseWithStatus(501);
  }

  async _perform() {
    const response = await this.perform();
    this._res.send(response);
    this._endResponse();
  }

  _sendResponseWithStatus(statusCode) {
    this._res.sendStatus(statusCode);
    this._endResponse();
  }

  _sendErrorResponse(responseErrorObject) {
    this._res.status(responseErrorObject.errorCode);
    this._res.json(responseErrorObject);
    this._endResponse();
  }

  _endResponse() {
    throw new ResponseSent();
  }

  static createHandler() {
    return async (req, res) => {
      const action = new this(req, res);
      try {
        await action._perform();
      } catch (e) {
        if (!(e instanceof ResponseSent)) {
          throw e;
        }
      }
    };
  }
}

module.exports = BaseAction;
