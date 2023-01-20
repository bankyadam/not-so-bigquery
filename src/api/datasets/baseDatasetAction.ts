import BaseProjectAction from '../projects/baseProjectAction';
import DatasetNotFoundError from '../../entities/dataset/errors/datasetNotFound';
import DatasetAlreadyExistsError from '../../entities/dataset/errors/datasetAlreadyExists';
import Dataset from '../../lib/bigQuery/dataset';

export default abstract class BaseDatasetAction extends BaseProjectAction {
  protected readonly dataset: Dataset;

  constructor(req, res) {
    super(req, res);
    this.dataset = this.project.dataset(this.datasetId);
  }

  protected get datasetId() {
    return this.req.params.datasetId;
  }

  protected async datasetShouldExist() {
    if (await this.dataset.exists()) {
      return;
    }

    this.sendErrorResponse(new DatasetNotFoundError(this.projectId, this.datasetId));
  }

  protected async datasetShouldNotExist() {
    if (!await this.dataset.exists()) {
      return;
    }

    this.sendErrorResponse(new DatasetAlreadyExistsError(this.projectId, this.datasetId));
  }
}
