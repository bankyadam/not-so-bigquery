'use strict';

const BaseEntityResponse = require('../baseEntityResponse');
const { map } = require('lodash');

module.exports = class TableDataListResponseObject extends BaseEntityResponse {
  constructor(data, totalRows, pageToken) {
    super();
    this._totalRows = totalRows;
    this._data = data;
    this._pageToken = pageToken;
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
      f: map(row, value => ({
        v: value.toString()
      }))
    }));
  }
};
