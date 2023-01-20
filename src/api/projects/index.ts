import { Router } from 'express';
import { ApiRouterFactory } from '../types/apiRouterFactory';

import routerFactory from '../../lib/router-factory';
import datasets from '../datasets';
import jobs from '../jobs';
import queries from '../queries';
import ProjectsListAction from './list';
import ProjectsGetServiceAccountAction from './getServiceAccount';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.use('/:projectId/datasets', datasets);
  router.use('/:projectId/jobs', jobs);
  router.use('/:projectId/queries', queries);

  // Not implemented
  router.get('/', ProjectsListAction.createHandler());
  router.get('/:projectId/serviceAccount', ProjectsGetServiceAccountAction.createHandler());
};

export default routerFactory(apiFactory);

