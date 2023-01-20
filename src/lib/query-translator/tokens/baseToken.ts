import { createToken, TokenType } from 'chevrotain';

export abstract class BaseToken {
  public name: string;
  pattern: RegExp;

  constructor() {
    this.name = this.constructor.name;
  }

  static compile():TokenType {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return createToken(new this);
  }
}
