'use strict';

module.exports = class TableReference {
  constructor(projectId, datasetId, tableId) {
    this.projectId = projectId;
    this.datasetId = datasetId;
    this.tableId = tableId;
  }

  get ID() {
    return `${this.projectId}:${this.datasetId}.${this.tableId}`;
  }

  toJSON() {
    return {
      projectId: this.projectId,
      datasetId: this.datasetId,
      tableId: this.tableId
    };
  }
};
