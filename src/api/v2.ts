import { Router } from 'express';
import { ApiRouterFactory } from './types/apiRouterFactory';

import routerFactory from '../lib/router-factory';
import projects from './projects';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.use('/projects', projects);
};

export default routerFactory(apiFactory);
