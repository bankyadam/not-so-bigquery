import BaseJsonAction from '../baseJsonAction';
import Project from '../../lib/bigQuery/project';

export default abstract class BaseProjectAction extends BaseJsonAction {
  protected project: Project;

  constructor(req, res) {
    super(req, res);
    this.project = new Project(this.projectId);
  }

  protected get projectId() {
    return this.req.params.projectId;
  }
}
