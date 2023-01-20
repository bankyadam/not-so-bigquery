import { ApiRouterFactory } from '../types/apiRouterFactory';
import { Router } from 'express';

import routerFactory from '../../lib/router-factory';
import TablesListAction from './list';
import TablesInsertAction from './insert';
import TablesGetAction from './get';
import TablesDeleteAction from './delete';
import TablesDataAction from './data';
import TablesInsertAllAction from './insertAll';
import TablesPatchAction from './patch';
import TablesUpdateAction from './update';

const apiFactory: ApiRouterFactory = (router: Router) => {
  router.get('/', TablesListAction.createHandler());
  router.post('/', TablesInsertAction.createHandler());

  router.get('/:tableId', TablesGetAction.createHandler());
  router.delete('/:tableId', TablesDeleteAction.createHandler());
  router.get('/:tableId/data', TablesDataAction.createHandler());
  router.post('/:tableId/insertAll', TablesInsertAllAction.createHandler());

  // Not implemented
  router.patch('/:tableId', TablesPatchAction.createHandler());
  router.put('/:tableId', TablesUpdateAction.createHandler());
};

export default routerFactory(apiFactory);

