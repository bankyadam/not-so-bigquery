'use strict';

module.exports = class BaseResponseObject {
  get TYPE() { return 'base'; }

  toJSON() {
    return {
      kind: `bigquery#${this.TYPE}`,
      generator: 'not-so-big-query'
    };
  }
};
