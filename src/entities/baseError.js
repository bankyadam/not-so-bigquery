module.exports = class BaseError {
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
};
