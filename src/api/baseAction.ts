import { Request, RequestHandler, Response } from 'express';

class ResponseSent {
}

export default abstract class BaseAction {
  protected readonly req: Request;
  protected readonly res: Response;

  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  static createHandler(): RequestHandler {
    return async (req, res) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const action = new this(req, res);
      try {
        await action.process();
      } catch (e) {
        if (!(e instanceof ResponseSent)) {
          throw e;
        }
      }
    };
  }

  abstract perform(): object | string

  protected async process(): Promise<void> {
    const response = await this.perform();
    this.res.send(response);
    this.endResponse();
  }

  protected sendResponseWithStatus(statusCode): void {
    this.res.sendStatus(statusCode);
    this.endResponse();
  }

  protected sendErrorResponse(responseErrorObject): void {
    this.res.status(responseErrorObject.errorCode);
    this.res.json(responseErrorObject);
    this.endResponse();
  }

  protected endResponse(): never {
    throw new ResponseSent();
  }
}
