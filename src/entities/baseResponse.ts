export default abstract class BaseResponse {
  abstract compose(): object
  abstract readonly TYPE: string;

  toJSON() {
    return {
      kind: `bigquery#${this.TYPE}`,
      generator: 'not-so-big-query'
    };
  }
}
