'use strict';

const BaseEntityResponse = require('../baseEntityResponse');
const TableResponseObject = require('../table/response');

module.exports = class TableListResponseObject extends BaseEntityResponse {
  constructor(projectId, datasetId, tables) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tables = tables || [];
  }

  get TYPE() { return 'tableList'; };

  compose() {
    return { tables: this._tables() };
  }

  _tables() {
    return this.tables.map(tableId => new TableResponseObject(this.projectId, this.datasetId, tableId));
  }
};
