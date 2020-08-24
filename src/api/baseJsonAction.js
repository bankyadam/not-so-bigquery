'use strict';

const BaseAction = require('./baseAction');

class BaseJsonAction extends BaseAction {
  async _perform() {
    const responseJson = await this.perform();
    this._res.json(responseJson);
    this._endResponse();
  }
}

module.exports = BaseJsonAction;
