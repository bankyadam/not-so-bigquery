class ErrorResponseSent extends Error {}

module.exports = class BaseAction {
  constructor(req, res) {
    this._req = req;
    this._res = res;
  }

  async perform() {
    this._res.sendStatus(501);
  }

  _sendErrorResponse(responseErrorObject) {
    this._res.status(responseErrorObject.errorCode);
    this._res.json(responseErrorObject);
    this._res.end();

    throw new ErrorResponseSent();
  }

  static createHandler() {
    return async (req, res) => {
      const action = new this(req, res);
      try {
        await action.perform();
      } catch (e) {
        if (!(e instanceof ErrorResponseSent)) {
          throw e;
        }
      }
    };
  }
}
