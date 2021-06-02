'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const TableResponseObject = require('../table/response');

module.exports = class TableListResponseObject extends BaseEntityResponseObject {
  constructor(projectId, datasetId, tableIds) {
    super();
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableIds = tableIds || [];
  }

  get TYPE() { return 'tableList'; };

  compose() {
    return { tables: this._tables() };
  }

  _tables() {
    return this.tableIds.map(tableId => new TableResponseObject(this.projectId, this.datasetId, tableId));
  }
};
