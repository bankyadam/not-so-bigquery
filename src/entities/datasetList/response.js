'use strict';

const BaseEntityResponseObject = require('../baseEntityResponse');
const DatasetResponseObject = require('../dataset/response');

module.exports = class DatasetListResponseObject extends BaseEntityResponseObject {
  constructor(projectId, datasets) {
    super();
    this.projectId = projectId;
    this.datasets = datasets || [];
  }

  get TYPE() { return 'datasetList'; };

  compose() {
    return { datasets: this._datasets() };
  }

  _datasets() {
    return this.datasets.map(datasetId => new DatasetResponseObject(this.projectId, datasetId));
  }
};
