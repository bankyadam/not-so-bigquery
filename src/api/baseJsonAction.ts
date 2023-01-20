import BaseAction from './baseAction';

export default abstract class BaseJsonAction extends BaseAction {
  async process() {
    const responseJson = await this.perform();
    this.res.json(responseJson);
    this.endResponse();
  }
}
