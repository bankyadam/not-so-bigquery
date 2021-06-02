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
      this._fields[field.name] = field.type;
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
      f: map(row, (value, name) => ({
        v: this._convertValue(value, this._fields[name])
      }))
    }));
  }

  _convertValue(value, type) {
    switch (type) {
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
        return value.toString();

      default:
        console.log('Unhandled type', value, type);
        return value.toString();
    }
  }
};
