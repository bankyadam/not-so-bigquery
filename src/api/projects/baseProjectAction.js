const BaseAction = require('../baseAction');

const { BigQueryProject: { create: createProject } } = require('../../db');

module.exports = class BaseProjectAction extends BaseAction {
  constructor(req, res) {
    super(req, res);
    this._db = createProject(this._projectId);
  }

  get _projectId() {
    return this._req.params.projectId;
  }
}
