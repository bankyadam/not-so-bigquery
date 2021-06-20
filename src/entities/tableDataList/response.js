'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const { map } = require('lodash');

module.exports = class TableDataListResponseObject extends BaseEntityResponseObject {
  constructor(data, totalRows, pageToken, fields) {
    fields = fields || [];
    super();
    this._totalRows = totalRows;
    this._data = data;
    this._pageToken = pageToken;
    this._fields = {};

    fields.forEach(field => {
      this._fields[field.name] = field;
    });
  }

  get TYPE() {
    return 'tableDataList';
  };

  compose() {
    return Object.assign({
      totalRows: this._totalRows,
      rows: this._convertData()
    }, this._pageToken ? { pageToken: this._pageToken } : {});
  }

  _convertData() {
    return this._data.map(row => ({
      f: map(row, (value, name) => {
        if (this._fields[name].mode === 'REPEATED') {
          return { v: value.map(v => ({ v: this._convertValue(v, this._fields[name].type) })) };
        }
        return { v: this._convertValue(value, this._fields[name].type) };
      })
    }));
  }

  _convertValue(value, type) {
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
        console.log('Unhandled type', value, type);
        return value.toString();
    }
  }
};
