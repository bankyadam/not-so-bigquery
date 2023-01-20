import { Router } from 'express';
import { ApiRouterFactory } from '../types/apiRouterFactory';

import routerFactory from '../../lib/router-factory';
import JobsGetQueryResultAction from './getQueryResult';
import JobsQueryAction from './query';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.get('/:jobId', JobsGetQueryResultAction.createHandler());

  // Not implemented
  router.post('/', JobsQueryAction.createHandler());
};

export default routerFactory(apiFactory);
