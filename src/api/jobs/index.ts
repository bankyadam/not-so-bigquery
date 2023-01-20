import { ApiRouterFactory } from '../types/apiRouterFactory';
import { Router } from 'express';

import routerFactory from '../../lib/router-factory';
import JobsInsertAction from './insert';
import JobsListAction from './list';
import JobsGetAction from './get';
import JobsCancelAction from './cancel';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.post('/', JobsInsertAction.createHandler());

  // Not implemented
  router.get('/', JobsListAction.createHandler());
  router.get('/:jobId', JobsGetAction.createHandler());
  router.post('/:jobId/cancel', JobsCancelAction.createHandler());
};

export default routerFactory(apiFactory);
