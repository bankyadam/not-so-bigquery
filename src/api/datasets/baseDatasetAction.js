'use strict';

const BaseProjectAction = require('../projects/baseProjectAction');

const DatasetNotFoundError = require('../../entities/dataset/errors/datasetNotFound');
const DatasetAlreadyExistsError = require('../../entities/dataset/errors/datasetAlreadyExists');

class BaseDatasetAction extends BaseProjectAction {
  constructor(req, res) {
    super(req, res);
    this._dataset = this._db.dataset(this._datasetId);
  }

  get _datasetId() {
    return this._req.params.datasetId;
  }

  async _datasetShouldExist() {
    if (await this._dataset.exists()) {
      return;
    }

    this._sendErrorResponse(new DatasetNotFoundError(this._projectId, this._datasetId));
  }

  async _datasetShouldNotExist() {
    if (!await this._dataset.exists()) {
      return;
    }

    this._sendErrorResponse(new DatasetAlreadyExistsError(this._projectId, this._datasetId));
  }
}

module.exports = BaseDatasetAction;
