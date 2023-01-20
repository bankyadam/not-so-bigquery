import { AsyncRouterInstance, create } from 'express-async-router';
import { ApiRouterFactory } from '../api/types/apiRouterFactory';

export default (init: ApiRouterFactory): AsyncRouterInstance => {
  const router = create({ mergeParams: true, strict: false });

  init.call(null, router);

  return router;
};
