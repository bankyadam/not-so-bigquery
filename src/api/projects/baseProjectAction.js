'use strict';

const BaseJsonAction = require('../baseJsonAction');

const Project = require('../../lib/bigQuery/project');

class BaseProjectAction extends BaseJsonAction {
  constructor(req, res) {
    super(req, res);
    this._project = new Project(this._projectId);
  }

  get _projectId() {
    return this._req.params.projectId;
  }
}

module.exports = BaseProjectAction;
