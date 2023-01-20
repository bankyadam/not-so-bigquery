abstract class BaseError extends Error {
  protected _errorCode: number;
  protected _status: string;
  protected _reason: string;
  protected _message: string;

  get errorCode(): number {
    return this._errorCode;
  }
  get status(): string {
    return this._status;
  }
  get reason(): string {
    return this._reason;
  }
  get message() {
    return this._message;
  }

  toJSON() {
    return {
      generator: 'not-so-big-query',
      error: {
        code: this.errorCode || 400,
        message: this.message,
        status: this.status || '',
        errors: [
          {
            reason: this.reason,
            message: this.message,
            domain: 'global'
          }
        ]
      }
    };
  }
}

export default BaseError;
