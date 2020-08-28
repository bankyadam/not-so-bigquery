'use strict';

const BaseJsonAction = require('../baseJsonAction');

const { BigQueryProject: { create: createProject } } = require('../../db');

class BaseProjectAction extends BaseJsonAction {
  constructor(req, res) {
    super(req, res);
    this._db = createProject(this._projectId);
  }

  get _projectId() {
    return this._req.params.projectId;
  }
}

module.exports = BaseProjectAction;
