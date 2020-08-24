'use strict';

const BaseDatasetAction = require('../datasets/baseDatasetAction');

const TableNotFoundError = require('../../entities/table/errors/tableNotFound');
const TableAlreadyExistsError = require('../../entities/table/errors/tableAlreadyExists');

class BaseTableAction extends BaseDatasetAction {
  constructor(req, res) {
    super(req, res);
    this._table = this._dataset.table(this._tableId);
  }

  get _tableId() {
    return this._req.params.tableId;
  }

  async _tableShouldExist() {
    if (await this._table.exists()) {
      return;
    }

    this._sendErrorResponse(new TableNotFoundError(this._projectId, this._datasetId, this._tableId));
  }

  async _tableShouldNotExist() {
    if (!await this._table.exists()) {
      return;
    }

    this._sendErrorResponse(new TableAlreadyExistsError(this._projectId, this._datasetId, this._tableId));
  }
}

module.exports = BaseTableAction;
