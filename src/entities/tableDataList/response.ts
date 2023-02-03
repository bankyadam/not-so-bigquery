import BaseEntityResponse from '../baseEntityResponse';
import { map } from 'lodash';
import { ResponseField } from '../types';

export default class TableDataListResponse extends BaseEntityResponse {
  TYPE = 'tableDataList';

  private readonly totalRows: number;
  private readonly pageToken: string;
  protected fields: ResponseField[];
  private data: unknown[];

  constructor(data: unknown[] = [], totalRows = 0, pageToken = '', fields: ResponseField[] = []) {
    super();
    this.data = data;
    this.totalRows = totalRows;
    this.pageToken = pageToken;
    this.fields = fields;
  }

  compose() {
    return Object.assign({
      totalRows: this.totalRows,
      rows: this.convertData()
    }, this.pageToken ? { pageToken: this.pageToken } : {});
  }

  private getFieldByName(name) {
    return this.fields.find((item) => item.name === name);
  }

  private convertData() {
    return this.data.map(row => ({
      f: map(row, (value, name) => {
        const field = this.getFieldByName(name);
        if (field.mode === 'REPEATED') {
          if (value === null) {
            return { v: null };
          }
          if (value.length === 0) {
            return { v: [] }
          }
          return { v: value.map(v => ({ v: this.convertValue(v, field.type) })) };
        }
        return { v: this.convertValue(value, field.type) };
      })
    }));
  }

  private convertValue(value, type) {
    if (value === null) {
      return null;
    }

    switch (type) {
      case 'BOOLEAN':
        return JSON.stringify(value);

      case 'TIMESTAMP':
        return (Date.parse(value) / 1000)
          .toExponential()
          .replace(/^(\d+\.\d+)e\+(\d+)/, '$1E$2');

      case 'DATE':
        return (new Date(value))
          .toISOString()
          .substr(0, 10);

      case 'TIME':
      case 'TEXT':
      case 'STRING':
        return value.toString();

      case 'INTEGER':
        return parseInt(value, 10);

      case 'FLOAT':
        return parseFloat(value);

      case 'JSON':
        return JSON.stringify(value);

      case 'ARRAY':
        return JSON.stringify(value);

      default:
        console.error('Unhandled type', value, type);
        return value.toString();
    }
  }
}
