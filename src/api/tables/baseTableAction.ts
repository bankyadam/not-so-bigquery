import BaseDatasetAction from '../datasets/baseDatasetAction';
import TableNotFoundError from '../../entities/table/errors/tableNotFound';
import TableAlreadyExistsError from '../../entities/table/errors/tableAlreadyExists';
import Table from '../../lib/bigQuery/table';

export default abstract class BaseTableAction extends BaseDatasetAction {
  protected readonly table: Table;

  constructor(req, res) {
    super(req, res);
    this.table = this.dataset.table(this.tableId);
  }

  protected get tableId() {
    return this.req.params.tableId;
  }

  protected async tableShouldExist() {
    if (await this.table.exists()) {
      return;
    }

    this.sendErrorResponse(new TableNotFoundError(this.projectId, this.datasetId, this.tableId));
  }

  protected async tableShouldNotExist() {
    if (!await this.table.exists()) {
      return;
    }

    this.sendErrorResponse(new TableAlreadyExistsError(this.projectId, this.datasetId, this.tableId));
  }
}
